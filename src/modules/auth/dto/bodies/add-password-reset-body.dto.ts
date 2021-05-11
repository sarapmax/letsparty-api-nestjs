import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class AddPasswordResetBodyDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @IsEmail()
  public readonly email: string;
}
