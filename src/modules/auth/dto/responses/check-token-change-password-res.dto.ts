import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { PasswordReset } from '../../password-reset.model';

@Exclude()
export class CheckChangePasswordTokenResDto {
  constructor(passwordReset: PasswordReset) {
    const passwordResetData: PasswordReset = passwordReset.get({ plain: true });

    this.isExpired = passwordResetData.expiredAt < new Date();
    this.token = passwordResetData.token;
    this.email = passwordResetData.email;
  }

  @ApiProperty()
  @Expose()
  public readonly isExpired: boolean;

  @ApiProperty()
  @Expose()
  public readonly email: string;

  @ApiProperty()
  @Expose()
  public readonly token: string;
}
