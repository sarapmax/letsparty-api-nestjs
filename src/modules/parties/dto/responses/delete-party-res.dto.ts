import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { RECORD_DELETED } from 'src/constants';

export class DeletePartyResDto {
  @ApiProperty()
  @Expose()
  public readonly message: string = RECORD_DELETED;
}
