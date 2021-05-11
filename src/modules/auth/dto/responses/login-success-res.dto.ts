import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { LOGGED_IN_SUCCESSFULLY } from 'src/constants';

@Exclude()
export class LoginSuccessResDto {
  constructor(loginSuccessRes: LoginSuccessResDto) {
    this.token = loginSuccessRes.token;
  }

  @ApiProperty()
  @Expose()
  public readonly message?: string = LOGGED_IN_SUCCESSFULLY;

  @ApiProperty()
  @Expose()
  public readonly token: string;
}
