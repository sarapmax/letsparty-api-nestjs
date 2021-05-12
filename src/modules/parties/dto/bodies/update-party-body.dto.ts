import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePartyBodyDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  public readonly name: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  public readonly maxMembers: number;
}
