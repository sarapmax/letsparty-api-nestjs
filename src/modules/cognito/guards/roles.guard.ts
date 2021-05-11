import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwtDecode from 'jwt-decode';
import { ROLES_KEY, RoleTypes } from '../../../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const requiredRoles: RoleTypes[] = this.reflector.getAllAndOverride<RoleTypes[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const req: Request = context.switchToHttp().getRequest();
    if (!req.headers['token']) {
      return false;
    }
    const token: Record<string, unknown> = jwtDecode(req.headers['token']);
    const roles: RoleTypes[] = token['cognito:groups'] ? token['cognito:groups'] as RoleTypes[] : [];

    return roles.some((role: RoleTypes) => requiredRoles.includes(role));
  }
}
