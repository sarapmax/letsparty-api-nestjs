import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { Party } from 'src/modules/parties/party.model';
import { User } from 'src/modules/users/user.model';
import { IsExisting } from 'src/validations/is-existing.validation';

export class AddUserPartyBodyDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsExisting(User, {
    column: 'id',
  })
  public readonly userId: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsExisting(Party, {
    column: 'id',
  })
  public readonly partyId: number;
}
