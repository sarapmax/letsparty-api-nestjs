import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { dbConfigOptions } from './database/database.config';
import { ConfigModule } from '@nestjs/config';
import { IsExistingConstraint } from './validations/is-existing.validation';
import { IsUniqueConstraint } from './validations/is-unique.validation';
import { PartiesModule } from './modules/parties/parties.module';
import { HealthModule } from './modules/health/health.module';
import { S3UploadModule } from './modules/core/s3-upload/s3-upload.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      ...dbConfigOptions(),
      autoLoadModels: true,
      synchronize: false,
    }),
    HealthModule,
    UsersModule,
    AuthModule,
    IsExistingConstraint,
    IsUniqueConstraint,
    PartiesModule,
    S3UploadModule,
  ],
})
export class AppModule {}
