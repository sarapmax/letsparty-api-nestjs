import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { setupValidateContainer } from '@scgwedotech/nestjs-error-handling';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { setupValidatePipe } from '@scgwedotech/nestjs-error-handling';
import helmet = require('helmet');
import compression = require('compression');
import { ContextInterceptor } from './context.interceptor';
import { HttpExceptionFilter } from './configs/http-exception.filter';
import { HttpLogsService } from './modules/http-logs/http-logs.service';
import { HttpLog } from './modules/http-logs/http-log.model';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  setupApp(app);
  setupValidateContainer(useContainer, app, AppModule);
  app.useGlobalInterceptors(new ContextInterceptor());
  setupSwagger(app, process.env.APP_NAME);
  app.useGlobalFilters(new HttpExceptionFilter(new HttpLogsService(HttpLog)));

  await app.listen(process.env.APP_PORT || 3000);
}

function setupApp(app: INestApplication): void {
  const cors: string[] = process.env.CORS.split(',');
  app.enableCors({
    origin: cors,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  app.use(helmet());
  app.use(compression());

  setupValidatePipe(app);
}

function setupSwagger(app: INestApplication, appName: string): void {
  const config: Pick<OpenAPIObject, 'openapi' | 'info' | 'servers' | 'security' | 'tags' | 'externalDocs'> =
    new DocumentBuilder()
      .setTitle(appName)
      .setDescription(`${appName} API`)
      .setVersion('1.0')
      .build();
  const document: OpenAPIObject =
    SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
