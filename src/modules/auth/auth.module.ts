import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
@Module({
  imports: [
    PassportModule,
    UsersModule,
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: 172800000 },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
