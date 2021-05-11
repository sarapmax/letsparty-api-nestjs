import { AdminGetUserResponse, InitiateAuthResponse } from '@aws-sdk/client-cognito-identity-provider';
import { CredentialProvider } from '@aws-sdk/types';
import { PermissionTypes, RoleTypes } from '../../../constants';

export interface ICognitoService {

  getAwsCredential(idToken: string): CredentialProvider;
  signUpWithVerify(username: string, password: string, email: string, role: RoleTypes): Promise<void>;
  signUpWithoutVerify(username: string, password: string, email: string, role: RoleTypes): Promise<void>;
  resendVerifyUserCode(username: string): Promise<void>
  verifyUser(username: string, code: string): Promise<void>;
  verifyUserAttribute(accessToken: string, attrName: string, code: string): Promise<void>
  signInWithPassword(username: string, password: string): Promise<InitiateAuthResponse>
  signInWithRefreshToken(username: string, refreshToken: string): Promise<InitiateAuthResponse>
  getUser(username: string): Promise<AdminGetUserResponse>;
  updateUserAttribute(username: string, attrName: string, attrValue: string): Promise<void>;
  updatePermissions(username: string, permissions: PermissionTypes[]): Promise<void>;
  updateUserStatus(username: string, status: boolean): Promise<void>;
  changePassword(accessToken: string, oldPwd: string, newPwd: string): Promise<void>;

}
