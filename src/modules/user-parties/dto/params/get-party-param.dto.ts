import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { Party } from 'src/modules/parties/party.model';
import { IsExisting } from 'src/validations/is-existing.validation';

export class GetPartyParamDto {
  @ApiProperty()
  @Expose()
  @Transform(({ value }: TransformFnParams): number => parseInt(value))
  @IsExisting(Party)
  public readonly id: number;
}
