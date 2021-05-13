import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { User } from 'src/modules/users/user.model';

@Exclude()
export class CheckUserAuthResDto {
  constructor(user: User) {
    Object.assign(this, user.get({ plain: true }));
  }

  @ApiProperty()
  @Expose()
  public readonly id: number;

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
