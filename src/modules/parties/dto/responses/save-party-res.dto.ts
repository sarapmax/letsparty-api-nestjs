import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { RECORD_CREATED } from 'src/constants';
import { Party } from '../../party.model';

@Exclude()
export class SavePartyResDto {
  constructor(party: Party, message: string = RECORD_CREATED) {
    this.id = party.id;
    this.message = message;
  }

  @ApiProperty()
  @Expose()
  public readonly id: string;

  @ApiProperty()
  @Expose()
  public readonly message: string;
}
