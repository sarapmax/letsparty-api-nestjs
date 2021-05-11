import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { PASSWORD_RESET_REQUESTED } from 'src/constants';
import { PasswordReset } from '../../password-reset.model';

@Exclude()
export class ResetPasswordSuccessResDto {
  constructor(passwordReset: PasswordReset) {
    const passwordResetData: PasswordReset = passwordReset.get({ plain: true });

    this.token = passwordResetData.token;
  }

  @ApiProperty()
  @Expose()
  public readonly message?: string = PASSWORD_RESET_REQUESTED;

  @ApiProperty()
  @Expose()
  public readonly token: string;
}
