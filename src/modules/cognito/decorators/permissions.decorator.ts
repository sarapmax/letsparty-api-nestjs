import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { PermissionTypes, PERMISSIONS_KEY } from '../../../constants';

export const Permissions: (...permissions: PermissionTypes[]) => CustomDecorator<string> =
  (...permissions: PermissionTypes[]) => SetMetadata(PERMISSIONS_KEY, permissions);
