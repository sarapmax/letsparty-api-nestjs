import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user.model';
import { ILoginUserData } from './interfaces/login-user-data.interface';
import { INVALID_CREDENTIALS } from 'src/constants';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(email: string, password: string): Promise<ILoginUserData>{
    const user: User = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }

    const userData: User = user.get({ plain: true });

    return {
      id: userData.id,
      email: userData.email,
      fullName: userData.fullName,
    };
  }
}
