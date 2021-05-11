import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
import { BasePipe } from './base.pipe';
import { plainToClass } from 'class-transformer';

@Injectable()
export class DeserializeRequestPipe extends BasePipe implements PipeTransform<any> {
  public async transform(value: unknown, metadata: ArgumentMetadata): Promise<any> {
    if (!value) {
      throw new BadRequestException('No data submitted');
    }

    const { metatype }: ArgumentMetadata = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    return plainToClass(metatype, value);
  }
}
