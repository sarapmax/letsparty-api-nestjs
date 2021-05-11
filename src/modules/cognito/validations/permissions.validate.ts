import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { INVALID_PERMISSION, PermissionTypes } from '../../../constants';

@ValidatorConstraint({ name: 'customText', async: false })
export class PemissionsValidate implements ValidatorConstraintInterface {
  public validate(permissions: string[]): boolean {
    return permissions.every((permission: string): boolean =>
      Object.values(PermissionTypes).includes(permission as PermissionTypes)
    );
  }

  public defaultMessage(): string {
    // here you can provide default error message if validation failed
    return INVALID_PERMISSION;
  }
}
