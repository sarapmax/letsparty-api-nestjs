import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { PASSWORD_RESET } from 'src/constants';

@Exclude()
export class ChangedPasswordResDto {
  @ApiProperty()
  @Expose()
  public readonly message: string = PASSWORD_RESET;
}
