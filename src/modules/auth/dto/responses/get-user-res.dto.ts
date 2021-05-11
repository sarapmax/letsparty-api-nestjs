import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { FIRST_NAME_FIELD, LAST_NAME_FIELD, PHONE_NO_FIELD, USER_ID_FIELD } from '../../../../constants';
import { User } from '../../../users/user.model';

@Exclude()
export class GetUserResDto {

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }

  @ApiProperty({ name: USER_ID_FIELD })
  @Expose({ name: USER_ID_FIELD })
  public readonly id: string;

  @ApiProperty({ name: FIRST_NAME_FIELD })
  @Expose({ name: FIRST_NAME_FIELD })
  public readonly firstName: string;

  @ApiProperty({ name: LAST_NAME_FIELD })
  @Expose({ name: LAST_NAME_FIELD })
  public readonly lastName: string;

  @ApiProperty({ name: PHONE_NO_FIELD })
  @Expose({ name: PHONE_NO_FIELD })
  public readonly phoneNo: string;

  @ApiProperty()
  @Expose()
  public readonly email: string;

}
