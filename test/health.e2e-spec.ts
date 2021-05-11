import request = require('supertest');
import { HealthCheckResult } from '@nestjs/terminus';
import { HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Base } from './base';
import { RootPathResDto } from '../src/modules/health/dto/responses/root-path-res.dto';

describe('Health Modules', () => {
  let base: Base;

  beforeAll(async () => {
    base = new Base();
    await base.init();
  });

  afterAll(async () => {
    await base.close();
  });

  it('Get root path: Success', () => {
    return request(base.getApp().getHttpServer())
      .get('/')
      .expect(HttpStatus.OK)
      .expect((res: request.Response): void => {
        const body: RootPathResDto = plainToClass(RootPathResDto, res.body);
        expect(body.appName).toBe(process.env.APP_NAME);
      });
  });

  it('Get heath path: Success', () => {
    return request(base.getApp().getHttpServer())
      .get('/health')
      .expect(HttpStatus.OK)
      .expect((res: request.Response): void => {
        const body: HealthCheckResult = res.body;
        expect(body.status).toBe('ok');
        expect(body.info.database.status).toBe('up');
      });
  });
});
