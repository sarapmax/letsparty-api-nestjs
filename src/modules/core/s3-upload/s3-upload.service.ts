import { S3 } from 'aws-sdk';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class S3UploadService {
  private s3: S3;
  private bucketName: string;

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.bucketName = process.env.S3_BUCKET_NAME;
  }

  public async upload(file: Express.Multer.File, name: string): Promise<S3.ManagedUpload.SendData> {
    const params: S3.Types.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: String(name),
      Body: file.buffer,
    };

    return new Promise((resolve: any, reject: any) => {
      this.s3.upload(params, (err: Error, data: S3.ManagedUpload.SendData) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  public async delete(fileKey: string): Promise<void> {
    const params: S3.Types.DeleteObjectRequest = {
      Bucket: this.bucketName,
      Key: fileKey,
    };

    return new Promise((resolve: any, reject: any) => {
      this.s3.deleteObject(params, (err: Error) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve();
      });
    });
  }
}
