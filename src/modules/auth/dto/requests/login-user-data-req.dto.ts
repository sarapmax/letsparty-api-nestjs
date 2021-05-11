import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ILoginUserData } from '../../interfaces/login-user-data.interface';

export class LoginUserDataReqDto {
  @ApiProperty()
  @Expose()
  public readonly user: ILoginUserData;
}
