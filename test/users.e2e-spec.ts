import request = require('supertest');
import faker = require('faker');
import { plainToClass } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';
import { Base } from './base';
import { GetUserResDto } from '../src/modules/users/dto/responses/get-user-res.dto';
import { AddUserBodyDto } from '../src/modules/users/dto/bodies/add-user-body.dto';
import { UpdateUserBodyDto } from '../src/modules/users/dto/bodies/update-user-body.dto';
import { DeleteUserResDto } from '../src/modules/users/dto/responses/delete-user-res.dto';

describe('Users Modules', () => {
  let base: Base;
  const apiVersion: string = '/v1';

  beforeAll(async () => {
    base = new Base();
    await base.init();
  });

  afterAll(async () => {
    await base.close();
  });

  // #region get all users
  it('Get all users: Success', () => {
    return request(base.getApp().getHttpServer())
      .get(`${apiVersion}/users`)
      .expect(HttpStatus.OK)
      .expect((res: request.Response): void => {
        const body: GetUserResDto[] = plainToClass(GetUserResDto, <any[]>res.body);
        expect(body instanceof Array).toBe(true);
        expect(body).toHaveLength(10);
        for(const user of body) {
          expect(typeof user.id).toBe('number');
          expect(typeof user.firstname).toBe('string');
          expect(typeof user.lastname).toBe('string');
          expect(typeof user.isActive).toBe('boolean');
        }
      });
  });
  // #endregion get all users

  // #region get user
  it('Get user: Success', () => {
    const userId: number = 1;
    return request(base.getApp().getHttpServer())
      .get(`${apiVersion}/user/${userId}`)
      .expect(HttpStatus.OK)
      .expect((res: request.Response): void => {
        const body: GetUserResDto = plainToClass(GetUserResDto, <any>res.body);
        expect(typeof body.id).toBe('number');
        expect(typeof body.firstname).toBe('string');
        expect(typeof body.lastname).toBe('string');
        expect(typeof body.isActive).toBe('boolean');
      });
  });

  it('Get user: Invalidate field', () => {
    const userId: string = 'INVALID_FIELD';
    return request(base.getApp().getHttpServer())
      .get(`${apiVersion}/user/${userId}`)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Get user: Not found', () => {
    const userId: number = 100;
    return request(base.getApp().getHttpServer())
      .get(`${apiVersion}/user/${userId}`)
      .expect(HttpStatus.NOT_FOUND);
  });
  // #endregion get user

  // #region add user
  it('Add user: Success', () => {
    const bodyReq: AddUserBodyDto = <AddUserBodyDto>{
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
    };
    return request(base.getApp().getHttpServer())
      .post(`${apiVersion}/user`)
      .send(bodyReq)
      .expect(HttpStatus.CREATED)
      .expect((res: request.Response): void => {
        const body: GetUserResDto = plainToClass(GetUserResDto, <any>res.body);
        expect(typeof body.id).toBe('number');
        expect(body.firstname).toBe(bodyReq.firstname);
        expect(body.lastname).toBe(body.lastname);
        expect(typeof body.isActive).toBe('boolean');
      });
  });

  it('Add user: Invalidate fields', () => {
    const bodyReq: AddUserBodyDto = <AddUserBodyDto>{
      firstname: 'INVALID_FIRSTNAME_@',
      lastname: faker.name.lastName(),
    };
    return request(base.getApp().getHttpServer())
      .post(`${apiVersion}/user`)
      .send(bodyReq)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Add user: Missing fields', () => {
    const bodyReq: AddUserBodyDto = <AddUserBodyDto>{
      lastname: faker.name.lastName(),
    };
    return request(base.getApp().getHttpServer())
      .post(`${apiVersion}/user`)
      .send(bodyReq)
      .expect(HttpStatus.BAD_REQUEST);
  });
  // #endregion add user

  // #region update user
  it('Update user: Success', () => {
    const userId: number = 1;
    const bodyReq: UpdateUserBodyDto = <UpdateUserBodyDto>{
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      active: true,
    };
    return request(base.getApp().getHttpServer())
      .patch(`${apiVersion}/user/${userId}`)
      .send(bodyReq)
      .expect(HttpStatus.OK)
      .expect((res: request.Response): void => {
        const body: GetUserResDto = plainToClass(GetUserResDto, <any>res.body);
        expect(typeof body.id).toBe('number');
        expect(body.firstname).toBe(bodyReq.firstname);
        expect(body.lastname).toBe(bodyReq.lastname);
        expect(typeof body.isActive).toBe('boolean');
      });
  });

  it('Update user: Missing fields', () => {
    const userId: number = 1;
    const bodyReq: UpdateUserBodyDto = <UpdateUserBodyDto>{};
    return request(base.getApp().getHttpServer())
      .patch(`${apiVersion}/user/${userId}`)
      .send(bodyReq)
      .expect(HttpStatus.BAD_REQUEST);
  });
  // #endregion update user

  // #region delete user
  it('Remove user: Success', () => {
    const userId: number = 1;
    return request(base.getApp().getHttpServer())
      .delete(`${apiVersion}/user/${userId}`)
      .expect(HttpStatus.OK)
      .expect((res: request.Response): void => {
        const body: DeleteUserResDto = plainToClass(DeleteUserResDto, <any>res.body);
        expect(body.success).toBe(true);
      });
  });

  it('Remove user: Invalid fields', () => {
    const userId: string = 'INVALID_FIELD';
    return request(base.getApp().getHttpServer())
      .delete(`${apiVersion}/user/${userId}`)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Remove user: Not found', () => {
    const userId: number = 100;
    return request(base.getApp().getHttpServer())
      .delete(`${apiVersion}/user/${userId}`)
      .expect(HttpStatus.NOT_FOUND);
  });
  // #endregion delete user
});
