import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../users/user.model';
import * as bcrypt from 'bcrypt';
import { ILoginUserData } from './interfaces/login-user-data.interface';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginSuccessResDto } from './dto/responses/login-success-res.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private usersRepository: typeof User,
    @Inject(UsersService) private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<User> {
    // find if user exist with this email
    try {
      const user: User = await this.usersService.findByEmail(email);

      if (!user) {
        return null;
      }

      // find if user password match
      const match: boolean = await this.comparePassword(password, user.password);

      if (!match) {
        return null;
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async login(user: ILoginUserData): Promise<LoginSuccessResDto> {
    try {
      const token: string = await this.generateToken(user);

      return { token };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async check(user: ILoginUserData): Promise<User> {
    try {
      const currentUser: User = await this.usersRepository.findOne({
        where: { id: user.id },
      });

      return currentUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async generateToken(user: ILoginUserData): Promise<string> {
    const token: string = await this.jwtService.signAsync(user);

    return token;
  }

  private async comparePassword(enteredPassword: string, dbPassword: string): Promise<boolean> {
    try {
      const match: boolean = await bcrypt.compare(enteredPassword, dbPassword);

      return match;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
