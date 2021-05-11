import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsAlpha, IsString, IsEmail } from 'class-validator';
import { IsUnique } from 'src/validations/is-unique.validation';
import { User } from '../../../users/user.model';

export class AddUserBodyDto {

  @ApiProperty()
  @Expose()
  @IsString()
  @IsEmail()
  @IsUnique(User)
  public readonly email: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsUnique(User)
  public readonly username: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsAlpha()
  public readonly password: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsAlpha()
  public readonly firstName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsAlpha()
  public readonly lastName: string;
}
