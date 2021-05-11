import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsUnique } from 'src/validations/is-unique.validation';
import { User } from '../../user.model';

export class UpdateUserBodyDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @IsEmail()
  @IsOptional()
  @IsUnique(User, {
    ignore: true,
  })
  public readonly email: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  public readonly password: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  public readonly firstName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  public readonly lastName: string;
}
