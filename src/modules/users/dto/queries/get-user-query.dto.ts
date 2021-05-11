import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetUserQueryDto {
  @ApiPropertyOptional()
  @Expose()
  public readonly email: string;
}
