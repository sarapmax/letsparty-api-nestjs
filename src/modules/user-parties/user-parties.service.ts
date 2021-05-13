import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserParty } from './user-party.model';
import { InjectModel } from '@nestjs/sequelize';
import { RequestContext } from 'src/request-context';

@Injectable()
export class UserPartiesService {
  constructor(
    @InjectModel(UserParty) private userPartiesRepository: typeof UserParty,
  ) {}

  public async create(partyId: number): Promise<UserParty> {
    try {
      const newUserParty: UserParty = await this.userPartiesRepository.create<UserParty>({
        userId: RequestContext.getCurrentUser().id,
        partyId,
      });

      return newUserParty;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
