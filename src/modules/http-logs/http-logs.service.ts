import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpLog } from './http-log.model';
import { IHttpLog } from './interfaces/http-log.interface';
@Injectable()
export class HttpLogsService {
  constructor(
    @InjectModel(HttpLog) private httpLogsRepository: typeof HttpLog,
  ) { }

  public async create(createHttpLog: IHttpLog): Promise<void> {
    try {
      await this.httpLogsRepository.create<HttpLog>(createHttpLog);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
