import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { GetUserResDto } from 'src/modules/users/dto/responses/get-user-res.dto';
import { User } from 'src/modules/users/user.model';
import { Party } from '../../party.model';

@Exclude()
export class GetPartyResDto {
  constructor(party: Party) {
    Object.assign(this, party.get({ plain: true }));
    this.partyMembers = party.users.map((user: User) => new GetUserResDto(user));
  }

  @ApiProperty()
  @Expose()
  public readonly id: number;

  @ApiProperty()
  @Expose()
  public readonly imageUrl: string;

  @ApiProperty()
  @Expose()
  public readonly name: string;

  @ApiProperty()
  @Expose()
  public readonly maxMembers: number;

  @ApiProperty()
  @Expose()
  public readonly partyMembers: GetUserResDto[];
}
