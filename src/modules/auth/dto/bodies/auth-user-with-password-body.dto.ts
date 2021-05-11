import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class AuthUserWithPasswordBodyDto {

  @ApiProperty()
  @Expose()
  @IsString()
  public readonly username: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @MinLength(8)
  public readonly password: string;

}
