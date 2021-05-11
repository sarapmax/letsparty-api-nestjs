import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersServiceProvider } from './users.provider';
import { CognitoModule } from '../cognito/cognito.module';
@Module({
  imports: [SequelizeModule.forFeature([User]), CognitoModule],
  providers: [UsersService,usersServiceProvider],
  controllers: [
    UsersController,
  ],
  exports: [UsersService,
    usersServiceProvider],
})
export class UsersModule {}
