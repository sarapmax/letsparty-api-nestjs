import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { User } from '../../user.model';

@Exclude()
export class GetEditorResDto {

  constructor(editor: User) {
    const editorData: User = editor.get({ plain: true });

    Object.assign(this, editorData);
  }

  @ApiProperty()
  @Expose()
  public readonly id: string;

  @ApiProperty()
  @Expose()
  public readonly email: string;

  @ApiProperty()
  @Expose()
  public readonly firstName: string;

  @ApiProperty()
  @Expose()
  public readonly lastName: string;
}
