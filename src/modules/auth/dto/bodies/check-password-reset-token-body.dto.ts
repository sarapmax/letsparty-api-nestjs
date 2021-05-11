import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CheckPasswordResetTokenBody {
  @ApiProperty()
  @Expose()
  public readonly token: string;
}
