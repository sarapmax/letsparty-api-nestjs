import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class AddPartyBodyDto {
  @ApiProperty()
  @Expose()
  @IsString()
  public readonly name: string;

  @ApiProperty()
  @Expose()
  public readonly maxMembers: number;
}
