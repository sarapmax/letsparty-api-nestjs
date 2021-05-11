import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AppLog } from './app-log.model';
import { IAppLog } from './interfaces/app-log.interface';
@Injectable()
export class AppLogsService {
  constructor(
    @InjectModel(AppLog) private appLogsRepository: typeof AppLog,
  ) { }

  public async create(createAppLog: IAppLog): Promise<void> {
    try {
      await this.appLogsRepository.create<AppLog>(createAppLog);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
