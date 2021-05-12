import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { User } from '../../user.model';

@Exclude()
export class GetUserResDto {
  constructor(user: User) {
    Object.assign(this, user.get({ plain: true }));
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

  @ApiProperty()
  @Expose()
  public readonly avatarUrl: string;
}
