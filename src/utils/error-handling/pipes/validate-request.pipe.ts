import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { snakeCase } from 'snake-case';
import { BasePipe } from './base.pipe';

@Injectable()
export class ValidateRequestPipe extends BasePipe implements PipeTransform<any> {

  public async transform(value: Record<string, unknown>, metadata: ArgumentMetadata): Promise<any> {
    if (!value) {
      throw new BadRequestException('No data submitted');
    }

    const { metatype }: ArgumentMetadata = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const errors: ValidationError[] = await validate(value);

    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Request data validation failed',
        info:  this.getErrors(errors),
      });
    }
    return value;
  }

  private getErrors(errors: ValidationError[]): {[type: string]: string} {
    const info: {[type: string]: string} = {};
    for (const error of errors) {
      const errorChildren: Record<string, unknown> = {};
      const errorRoot: {[type: string]: string} = {};
      if (error.children.length > 0) {
        const constraints: {[type: string]: string} = this.getErrors(error.children);
        errorChildren[snakeCase(error.property)] = constraints;
      } else if (error.constraints) {
        Object.keys(error.constraints).forEach((key: string) => {
          const message: string[] = error.constraints[key].split(' ');
          message[0] = snakeCase(message[0]);
          errorRoot[snakeCase(error.property)] = message.join(' ');
        });
      }
      Object.assign(info, errorChildren, errorRoot);
    }
    return info;
  }
}
