import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { COGNITO_USER_CREATED } from 'src/constants';

export class AddCognitoUserResDto {
  @ApiProperty()
  @Expose()
  public readonly message: string = COGNITO_USER_CREATED;
}
