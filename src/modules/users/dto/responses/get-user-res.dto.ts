import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { User } from '../../user.model';

@Exclude()
export class GetUserResDto {
  constructor(user: User) {
    const userData: User = user.get({ plain: true });

    Object.assign(this, userData);
  }

  @ApiProperty()
  @Expose()
  public readonly id: string;

  @ApiProperty()
  @Expose()
  public readonly email: string;

  @ApiProperty()
  @Expose()
  public readonly fullName: string;
}
