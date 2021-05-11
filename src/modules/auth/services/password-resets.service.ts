import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddPasswordResetBodyDto } from '../dto/bodies/add-password-reset-body.dto';
import { CheckPasswordResetTokenBody } from '../dto/bodies/check-password-reset-token-body.dto';
import { PasswordReset } from '../password-reset.model';

@Injectable()
export class PasswordResetsService {
  constructor(
    @InjectModel(PasswordReset) private passwordResetsRepository: typeof PasswordReset
  ) {}

  public async findByEmail(email: string): Promise<PasswordReset> {
    const passwordReset: PasswordReset = await this.passwordResetsRepository.findOne<PasswordReset>({ where: { email } });
    return passwordReset;
  }

  public async findByToken(token: string): Promise<PasswordReset> {
    const passwordReset: PasswordReset = await this.passwordResetsRepository.findOne<PasswordReset>({ where: { token } });
    return passwordReset;
  }

  public async upsert(addPasswordResetBodyDto: AddPasswordResetBodyDto): Promise<PasswordReset> {
    const existingPasswordReset: PasswordReset = await this.passwordResetsRepository.findOne<PasswordReset>({ where: { email: addPasswordResetBodyDto.email } });

    const dateExpired: number = new Date().getTime() + Number(process.env.FORGET_EXPIRATION_HOURS) * 60 * 60 * 1000;
    const [updatedPasswordReset]: [PasswordReset, boolean] = await this.passwordResetsRepository.upsert<PasswordReset>( {
      id: existingPasswordReset?.id,
      email: addPasswordResetBodyDto.email,
      token: (Math.floor(Math.random() * (9000000)) + 1000000).toString(),
      expiredAt: dateExpired,
    }, {
      returning: true,
    });

    return updatedPasswordReset;
  }

  public async destroyByToken(token: string): Promise<void> {
    await this.passwordResetsRepository.destroy({ where: { token } });
  }

  public async checkValidToken(data: CheckPasswordResetTokenBody): Promise<PasswordReset> {
    const passwordReset: PasswordReset = await this.findByToken(data.token);
    return passwordReset;
  }
}
