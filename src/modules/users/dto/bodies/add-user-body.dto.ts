import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';
import { IsUnique } from 'src/validations/is-unique.validation';
import { User } from '../../user.model';

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
  public readonly password: string;

  @ApiProperty()
  @Expose()
  @IsString()
  public readonly fullName: string;
}
