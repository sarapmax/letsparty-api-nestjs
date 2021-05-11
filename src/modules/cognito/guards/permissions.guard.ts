import { AdminGetUserResponse, AttributeType } from '@aws-sdk/client-cognito-identity-provider';
import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwtDecode from 'jwt-decode';
import { PermissionTypes, PERMISSIONS_KEY, ICOGNITO_SERVICE_PROVIDER } from '../../../constants';
import { ICognitoService } from '../intefaces/cognito-service.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(ICOGNITO_SERVICE_PROVIDER) private readonly cognitoService: ICognitoService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions: PermissionTypes[] = this.reflector.getAllAndOverride<PermissionTypes[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions) {
      return true;
    }

    const req: Request = context.switchToHttp().getRequest();
    if (!req.headers['token']) {
      return false;
    }
    const token: Record<string, unknown> = jwtDecode(req.headers['token']);
    const username: string = token['cognito:username'] as string;
    const user: AdminGetUserResponse = await this.cognitoService.getUser(username);
    const permissions: AttributeType = user.UserAttributes.find((attr: AttributeType): boolean => attr.Name === 'custom:permissions');
    const permissionsArr: PermissionTypes[] = permissions.Value.split(' ') as PermissionTypes[];
    return permissionsArr.some((permission: PermissionTypes) => requiredPermissions.includes(permission));
  }
}
