import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { UNAUTHORIZED_TO_PERFORM_OPERATION } from 'src/constants';
import { ILoginPayload } from './interfaces/login-user-data.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  public async validate(payload: ILoginPayload): Promise<ILoginPayload> {
    // check if user in the token actually exist
    const user: User = await this.userService.verifyById(payload.id);

    if (!user) {
      throw new UnauthorizedException(UNAUTHORIZED_TO_PERFORM_OPERATION);
    }

    return payload;
  }
}
