import { NestExpressApplication } from '@nestjs/platform-express';
import { INestApplication, ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { useContainer as ValidaterContainer } from 'class-validator';
import { DeserializeRequestPipe } from './pipes/deserialize-request.pipe';
import { ValidateRequestPipe } from './pipes/validate-request.pipe';
import { ExceptionsHandlerFilter } from './filters/exception-handler.filter';

export function setupValidatePipe(app: NestExpressApplication|INestApplication): void {
  const reflactor: Reflector = app.get(Reflector);

  app.useGlobalPipes(new DeserializeRequestPipe(), new ValidateRequestPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflactor));
  app.useGlobalFilters(new ExceptionsHandlerFilter());
}

export function setupValidateContainer(
  useContainer: typeof ValidaterContainer,
  app: NestExpressApplication|INestApplication,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  AppModule?: any
): void {
  useContainer(AppModule ? app.select(AppModule) : app, { fallbackOnErrors: true });
}
