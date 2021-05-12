import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Party } from './party.model';
import { PartiesController } from './parties.controller';
import { PartiesService } from './parties.service';
@Module({
  imports: [SequelizeModule.forFeature([Party])],
  providers: [PartiesService],
  controllers: [PartiesController],
  exports: [PartiesService],
})
export class PartiesModule {}
