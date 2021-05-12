import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { RECORD_CREATED } from 'src/constants';
import { UserParty } from '../../user-party.model';

export class SaveUserPartyResDto {
  constructor(userParty: UserParty, message: string = RECORD_CREATED) {
    this.message = message;
    this.userId = userParty.userId;
    this.partyId = userParty.partyId;
  }

  @ApiProperty()
  @Expose()
  public readonly message: string;

  @ApiProperty()
  @Expose()
  public readonly userId: number;

  @ApiProperty()
  @Expose()
  public readonly partyId: number;
}
