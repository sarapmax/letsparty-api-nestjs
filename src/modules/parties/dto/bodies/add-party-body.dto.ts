import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class AddPartyBodyDto {
  @ApiProperty()
  @Expose()
  @IsString()
  public readonly name: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  public readonly maxMembers: number;
}
