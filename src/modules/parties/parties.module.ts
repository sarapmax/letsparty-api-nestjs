import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Party } from './party.model';
import { PartiesController } from './parties.controller';
import { PartiesService } from './parties.service';
import { S3UploadModule } from '../core/s3-upload/s3-upload.module';
@Module({
  imports: [
    SequelizeModule.forFeature([Party]),
    S3UploadModule,
  ],
  providers: [PartiesService],
  controllers: [PartiesController],
  exports: [PartiesService],
})
export class PartiesModule {}
