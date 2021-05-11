import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { Expose } from 'class-transformer';

export class AuthUserWithPasswordResDto {

  constructor(authToken: Partial<AuthenticationResultType>) {
    this.tokenType = authToken.TokenType;
    this.idToken = authToken.IdToken;
    this.accessToken = authToken.AccessToken;
    this.refreshToken = authToken.RefreshToken;
    this.expiresIn = authToken.ExpiresIn;
  }

  @Expose()
  public readonly tokenType: string;

  @Expose()
  public readonly idToken: string;

  @Expose()
  public readonly accessToken: string;

  @Expose()
  public readonly refreshToken: string;

  @Expose()
  public readonly expiresIn: number;

}
