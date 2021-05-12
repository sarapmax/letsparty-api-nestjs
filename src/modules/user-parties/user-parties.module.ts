import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserParty } from './user-party.model';
import { UserPartiesController } from './user-parties.controller';
import { UserPartiesService } from './user-parties.service';
@Module({
  imports: [SequelizeModule.forFeature([UserParty])],
  providers: [UserPartiesService],
  controllers: [UserPartiesController],
  exports: [UserPartiesService],
})
export class UserPartiesModule {}
