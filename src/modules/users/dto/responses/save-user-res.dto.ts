import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { RECORD_CREATED } from 'src/constants';
import { User } from '../../user.model';

@Exclude()
export class SaveUserResDto {
  constructor(user: User, message: string = RECORD_CREATED) {
    const userData: User = user.get({ plain: true });

    this.id = userData.id;
    this.message = message;
  }

  @ApiProperty()
  @Expose()
  public readonly id: string;

  @ApiProperty()
  @Expose()
  public readonly message: string;
}
