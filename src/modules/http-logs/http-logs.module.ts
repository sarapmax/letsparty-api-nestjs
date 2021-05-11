import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpLog } from './http-log.model';
import { HttpLogsService } from './http-logs.service';

@Module({
  imports: [SequelizeModule.forFeature([HttpLog])],
  providers: [HttpLogsService],
})
export class HttpLogsModule {}
