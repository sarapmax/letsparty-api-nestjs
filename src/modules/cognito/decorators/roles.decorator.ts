import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RoleTypes, ROLES_KEY } from '../../../constants';

export const Roles: (...roles: RoleTypes[]) => CustomDecorator<string> =
  (...roles: RoleTypes[]) => SetMetadata(ROLES_KEY, roles);
