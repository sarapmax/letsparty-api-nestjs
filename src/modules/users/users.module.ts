import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { S3UploadModule } from '../core/s3-upload/s3-upload.module';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    S3UploadModule,
  ],
  providers: [UsersService],
  controllers: [
    UsersController,
  ],
  exports: [UsersService],
})
export class UsersModule {}
