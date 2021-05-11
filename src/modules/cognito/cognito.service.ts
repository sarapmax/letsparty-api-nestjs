import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICONFIG_SERVICE_PROVIDER, IConfigService } from '@scgwedotech/nestjs-config';
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  ChallengeNameType,
  AuthFlowType,
  MessageActionType,
  AdminRespondToAuthChallengeCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  InitiateAuthResponse,
  AdminAddUserToGroupCommand,
  AdminGetUserCommand,
  AdminGetUserResponse,
  AdminUpdateUserAttributesCommand,
  AdminEnableUserCommand,
  AdminDisableUserCommand,
  VerifyUserAttributeCommand,
  ResendConfirmationCodeCommand,
  ChangePasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { createHmac } from 'crypto';
import { ICognitoService } from './intefaces/cognito-service.interface';
import {
  AWS_COGNITO_CLIENT_ID_CONF,
  AWS_COGNITO_CLIENT_SECRET_CONF,
  AWS_COGNITO_IDENTITY_POOL_ID_CONF,
  AWS_COGNITO_USER_POOL_ID_CONF,
  AWS_REGION_CONF,
  PermissionTypes,
  RoleTypes,
  SAME_PASSWORD,
} from '../../constants';
import { CredentialProvider } from '@aws-sdk/types';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';

@Injectable()
export class CognitoService implements ICognitoService {

  private readonly cognitoClient: CognitoIdentityProviderClient;
  private readonly userPoolId: string;
  private readonly clientId: string;
  private readonly cognitoIdClient: CognitoIdentityClient;
  private readonly region: string;

  constructor(@Inject(ICONFIG_SERVICE_PROVIDER) private readonly configService: IConfigService) {
    this.region = this.configService.getString(AWS_REGION_CONF);
    this.userPoolId = this.configService.getString(AWS_COGNITO_USER_POOL_ID_CONF);
    this.clientId = this.configService.getString(AWS_COGNITO_CLIENT_ID_CONF);
    this.cognitoIdClient = new CognitoIdentityClient({ region: this.region });

    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.region,
      credentials: fromCognitoIdentityPool({
        client: this.cognitoIdClient,
        identityPoolId: this.configService.getString(AWS_COGNITO_IDENTITY_POOL_ID_CONF),
      }),
    });
  }

  public getAwsCredential(idToken: string): CredentialProvider {
    const cognitoProvider: string = `cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}`;
    return fromCognitoIdentityPool({
      client: this.cognitoIdClient,
      identityPoolId: this.configService.getString(AWS_COGNITO_IDENTITY_POOL_ID_CONF),
      logins: {
        [cognitoProvider]: idToken,
      },
    });
  }

  public async signUpWithoutVerify(username: string, password: string, email: string, role: RoleTypes = RoleTypes.USER): Promise<void> {
    const createUserCmd: AdminCreateUserCommand = new AdminCreateUserCommand({
      UserPoolId: this.userPoolId,
      Username: username,
      TemporaryPassword: password,
      MessageAction: MessageActionType.SUPPRESS,
      UserAttributes: [{
        'Name': 'email',
        'Value': email,
      }],
    });
    await this.cognitoClient.send(createUserCmd).catch((error: any) => {
      throw new BadRequestException(error.message);
    });

    await this.addUserToGroup(username, role);

    const signInRes: InitiateAuthResponse = await this.signInWithPassword(username, password);

    if (signInRes.ChallengeName === ChallengeNameType.NEW_PASSWORD_REQUIRED) {
      const resetPasswordCmd: AdminRespondToAuthChallengeCommand = new AdminRespondToAuthChallengeCommand({
        ChallengeName: ChallengeNameType.NEW_PASSWORD_REQUIRED,
        ClientId: this.clientId,
        UserPoolId: this.userPoolId,
        ChallengeResponses: {
          USERNAME: username,
          NEW_PASSWORD: password,
          // SECRET_HASH: this.generateHash(username),
        },
        Session: signInRes.Session,
      });
      await this.cognitoClient.send(resetPasswordCmd).catch((error: Error) => {
        throw new BadRequestException(error.message);
      });
    }
  }

  public async signUpWithVerify(username: string, password: string, email: string, role: RoleTypes = RoleTypes.USER): Promise<void> {
    const signUpCommand: SignUpCommand = new SignUpCommand({
      //SecretHash: this.generateHash(username),
      ClientId: this.clientId,
      Username: username,
      Password: password,
      UserAttributes: [{
        'Name': 'email',
        'Value': email,
      }],
    });
    await this.cognitoClient.send(signUpCommand).catch((error: Error) => {
      throw new BadRequestException(error.message);
    });

    await this.addUserToGroup(username, role);
  }

  public async resendVerifyUserCode(username: string): Promise<void> {
    const resendCmd: ResendConfirmationCodeCommand = new ResendConfirmationCodeCommand({
      ClientId: this.clientId,
      SecretHash: this.generateHash(username),
      Username: username,
    });

    await this.cognitoClient.send(resendCmd).catch((error: Error) => {
      throw new BadRequestException(error.message);
    });
  }

  public async resendVerifyUserAttribute(username: string): Promise<void> {
    const resendCmd: ResendConfirmationCodeCommand = new ResendConfirmationCodeCommand({
      ClientId: this.clientId,
      SecretHash: this.generateHash(username),
      Username: username,
    });

    await this.cognitoClient.send(resendCmd).catch((error: Error) => {
      throw new BadRequestException(error.message);
    });
  }

  public async verifyUser(username: string, code: string): Promise<void> {
    const confirmCmd: ConfirmSignUpCommand = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      SecretHash: this.generateHash(username),
      Username: username,
      ConfirmationCode: code,
      ForceAliasCreation: true,
    });
    await this.cognitoClient.send(confirmCmd).catch((error: Error) => {
      throw new BadRequestException(error.message);
    });
  }

  public async verifyUserAttribute(accessToken: string, attrName: string, code: string): Promise<void> {
    const verifyCmd: VerifyUserAttributeCommand = new VerifyUserAttributeCommand({
      AccessToken: accessToken,
      AttributeName: attrName,
      Code: code,
    });
    await this.cognitoClient.send(verifyCmd).catch((error: Error) => {
      throw new BadRequestException(error.message);
    });
  }

  public async signInWithPassword(username: string, password: string): Promise<InitiateAuthResponse> {
    const authCmd: InitiateAuthCommand = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        // SECRET_HASH: this.generateHash(username),
      },
    });
    return this.cognitoClient.send(authCmd).catch((error: Error) => {
      throw new BadRequestException(error.message);
    });
  }

  public async signInWithRefreshToken(username: string, refreshToken: string): Promise<InitiateAuthResponse> {
    const authCmd: InitiateAuthCommand = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      ClientId: this.clientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
        SECRET_HASH: this.generateHash(username),
      },
    });
    return this.cognitoClient.send(authCmd).catch((error: Error) => {
      throw new BadRequestException(error.message);
    });
  }

  public async getUser(username: string): Promise<AdminGetUserResponse> {
    const getUserCmd: AdminGetUserCommand = new AdminGetUserCommand({
      UserPoolId: this.userPoolId,
      Username: username,
    });
    return this.cognitoClient.send(getUserCmd).catch((error: Error) => {
      throw new BadRequestException(error.message);
    });
  }

  public async updateUserAttribute(username: string, attrName: string, attrValue: string): Promise<void> {
    const addAttrCmd: AdminUpdateUserAttributesCommand = new AdminUpdateUserAttributesCommand({
      UserPoolId: this.userPoolId,
      Username: username,
      UserAttributes: [{
        'Name': attrName,
        'Value': attrValue,
      }],
    });
    await this.cognitoClient.send(addAttrCmd).catch((error: Error) => {
      throw new BadRequestException(error.message);
    });
  }

  public async updatePermissions(username: string, permissions: PermissionTypes[]): Promise<void> {
    await this.updateUserAttribute(username, 'custom:permissions', permissions.length ? permissions.join() : '');
  }

  public async updateUserStatus(username: string, status: boolean): Promise<void> {
    let updateStatusCmd: AdminEnableUserCommand | AdminDisableUserCommand;
    if (status) {
      updateStatusCmd = new AdminEnableUserCommand({
        UserPoolId: this.userPoolId,
        Username: username,
      });
    } else {
      updateStatusCmd = new AdminDisableUserCommand({
        UserPoolId: this.userPoolId,
        Username: username,
      });
    }
    await this.cognitoClient.send(updateStatusCmd).catch((error: Error) => {
      throw new BadRequestException(error.message);
    });
  }

  public async changePassword(accessToken: string, oldPwd: string, newPwd: string): Promise<void> {
    if (oldPwd === newPwd) {
      throw new BadRequestException(SAME_PASSWORD);
    }
    const changePwdCmd: ChangePasswordCommand = new ChangePasswordCommand({
      AccessToken: accessToken,
      PreviousPassword: oldPwd,
      ProposedPassword: newPwd,
    });
    await this.cognitoClient.send(changePwdCmd).catch((error: Error) => {
      throw new BadRequestException(error.message);
    });
  }

  private async addUserToGroup(username: string, groupName: RoleTypes): Promise<void> {
    const addToGroupCmd: AdminAddUserToGroupCommand = new AdminAddUserToGroupCommand({
      UserPoolId: this.userPoolId,
      Username: username,
      GroupName: groupName,
    });
    await this.cognitoClient.send(addToGroupCmd);
  }

  private generateHash(username: string): string {
    const secret: string = this.configService.getString(AWS_COGNITO_CLIENT_SECRET_CONF);
    return createHmac('SHA256', secret)
      .update(`${username}${this.clientId}`)
      .digest('base64');
  }
}
