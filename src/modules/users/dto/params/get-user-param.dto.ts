import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { IsExisting } from 'src/validations/is-existing.validation';
import { User } from '../../user.model';

export class GetUserParamDto {
  @ApiProperty()
  @Expose()
  @Transform(({ value }: TransformFnParams): number => parseInt(value))
  @IsExisting(User)
  public readonly id: number;
}
