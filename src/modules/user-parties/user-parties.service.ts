import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserParty } from './user-party.model';
import { AddUserPartyBodyDto } from './dto/bodies/add-user-party-body.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserPartiesService {
  constructor(
    @InjectModel(UserParty) private userPartiesRepository: typeof UserParty,
  ) {}

  public async create(addUserPartyBodyDto: AddUserPartyBodyDto): Promise<UserParty> {
    try {
      const newUserParty: UserParty = await this.userPartiesRepository.create<UserParty>(addUserPartyBodyDto);

      return newUserParty;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
