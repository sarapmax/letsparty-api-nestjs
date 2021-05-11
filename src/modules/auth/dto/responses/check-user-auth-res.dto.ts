import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { User } from 'src/modules/users/user.model';

@Exclude()
export class CheckUserAuthResDto {
  constructor(user: User) {
    const userDataValues: User = user.get({ plain: true });

    this.id = userDataValues.id;
    this.email = userDataValues.email;
    this.fullName = userDataValues.fullName;
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
}
