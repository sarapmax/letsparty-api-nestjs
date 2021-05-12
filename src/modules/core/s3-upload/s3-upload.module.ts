import { Module } from '@nestjs/common';
import { S3UploadService } from './s3-upload.service';
@Module({
  imports: [],
  providers: [S3UploadService],
  controllers: [],
  exports: [S3UploadService],
})
export class S3UploadModule {}
