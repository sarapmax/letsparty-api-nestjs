import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

export class AddCognitoUserBodyDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty()
  @Expose()
  @IsString()
  public readonly password: string;

  @ApiProperty()
  @Expose()
  @IsString()
  public readonly firstName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  public readonly lastName: string;
}
