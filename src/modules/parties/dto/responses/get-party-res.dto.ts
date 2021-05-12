import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { Party } from '../../party.model';

@Exclude()
export class GetPartyResDto {
  constructor(party: Party) {
    Object.assign(this, party.get({ plain: true }));
  }

  @ApiProperty()
  @Expose()
  public readonly imageUrl: string;

  @ApiProperty()
  @Expose()
  public readonly name: string;

  @ApiProperty()
  @Expose()
  public readonly maxMembers: number;
}
