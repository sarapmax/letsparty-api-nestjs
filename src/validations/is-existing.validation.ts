import { registerDecorator, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions } from 'class-validator';
import { Repository, Sequelize } from 'sequelize-typescript';
import { IIsExistingOptions } from './interfaces/is-existing-validation.interface';

@ValidatorConstraint({ async: true })
export class IsExistingConstraint implements ValidatorConstraintInterface {

  constructor(private readonly sequelize: Sequelize) { }

  public async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const [model, propertyName, column, nullable]: any = args.constraints;
    const repository: Repository<typeof model> = this.sequelize.getRepository(model);

    const results: typeof model = await repository.findAll<typeof model>({
      attributes: [column || propertyName],
    });

    const existingValues: typeof model = results.map((value: typeof model) => {
      return value['dataValues'][column || propertyName];
    });

    if (nullable && value == null) {
      return true;
    }

    return existingValues.includes(value);
  }

  public defaultMessage(args: ValidationArguments): string {
    const [, propertyName, column]: any = args.constraints;

    return `the selected ${column || propertyName} not found`;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function IsExisting(entity: Function, isExistingOption: IIsExistingOptions = {}, validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: object, propertyName: string): void => {
    return registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, propertyName, isExistingOption.column || null, isExistingOption.nullable || false],
      validator: IsExistingConstraint,
    });
  };
}
