import { ContinuationLocalStorage } from 'asyncctx';
import { Request } from 'express';
import { User } from './modules/users/user.model';

export class RequestContext {
  constructor(public readonly req: Request) {}

  public static cls: ContinuationLocalStorage<RequestContext> = new ContinuationLocalStorage<RequestContext>();

  public static getCurrentContext(): RequestContext {
    return this.cls.getContext();
  }

  public static getCurrentUser(): User {
    return this.getCurrentContext().req.user as User;
  }
}
