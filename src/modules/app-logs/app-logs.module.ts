import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppLog } from './app-log.model';
import { AppLogsService } from './app-logs.service';

@Module({
  imports: [SequelizeModule.forFeature([AppLog])],
  providers: [AppLogsService],
})
export class AppLogsModule {}
