import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { IsExisting } from 'src/validations/is-existing.validation';
import { Party } from '../../party.model';

export class GetPartyParamDto {
  @ApiProperty()
  @Expose()
  @Transform(({ value }: TransformFnParams): number => parseInt(value))
  @IsExisting(Party)
  public readonly id: number;
}
