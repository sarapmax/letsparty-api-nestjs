import { registerDecorator, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions } from 'class-validator';
import { Repository, Sequelize } from 'sequelize-typescript';
import { IIsUniqueOptions } from './interfaces/is-unique-validation.interface';

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {

  constructor(private readonly sequelize: Sequelize) { }

  public async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const [model, propertyName, column, ignore, paramName, fieldName]: any = args.constraints;
    const repository: Repository<typeof model> = this.sequelize.getRepository(model);

    const results: typeof model = await repository.findAll<typeof model>({ where: { [column || propertyName]: value } });

    if (ignore) {
      return results.length === 0 || !!results.find((record: typeof model): boolean => record[fieldName] == args.object['context'].params[paramName]);
    } else {
      return results.length === 0;
    }
  }

  public defaultMessage(args: ValidationArguments): string {
    const [, propertyName, column]: any = args.constraints;

    return `"${args.value}" already exists for ${column || propertyName}`;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function IsUnique(entity: Function, isUniqueOption: IIsUniqueOptions = {}, validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [
        entity,
        propertyName,
        isUniqueOption.column || null,
        isUniqueOption.ignore || false,
        isUniqueOption.paramName || 'id',
        isUniqueOption.fieldName || 'id',
      ],
      validator: IsUniqueConstraint,
    });
  };
}
