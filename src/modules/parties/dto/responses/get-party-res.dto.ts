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
    this.createdBy = party.createdBy ? new GetUserResDto(party.createdBy) : null;
    this.updatedBy = party.updatedBy ? new GetUserResDto(party.updatedBy) : null;
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

  @ApiProperty({ type: [GetUserResDto] })
  @Expose()
  public readonly partyMembers: GetUserResDto[];

  @ApiProperty({ type: GetUserResDto })
  @Expose()
  public readonly createdBy: GetUserResDto;

  @ApiProperty({ type: GetUserResDto })
  @Expose()
  public readonly updatedBy: GetUserResDto;
}
