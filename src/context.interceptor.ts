import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { RequestContext } from './request-context';

/**
 * Injects request data into the context, so that the ValidationPipe can use it.
 */
@Injectable()
export class ContextInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    const requestContext: RequestContext = new RequestContext(request);
    RequestContext.cls.setContext(requestContext);

    request.body.context = {
      params: request.params,
      query: request.query,
      user: request.user,
    };

    return next.handle();
  }
}
