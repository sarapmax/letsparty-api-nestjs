import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../../users/user.model';
import { ILoginUserData } from '../interfaces/login-user-data.interface';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private usersRepository: typeof User
  ) { }

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
}
