import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Party } from './party.model';
import { AddPartyBodyDto } from './dto/bodies/add-party-body.dto';
import { UpdatePartyBodyDto } from './dto/bodies/update-party-body.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RECORD_NOT_FOUND } from 'src/constants';
@Injectable()
export class PartiesService {
  constructor(
    @InjectModel(Party) private partiesRepository: typeof Party,
  ) { }

  public async findAll(): Promise<Party[]> {
    try {
      const parties: Party[] = await this.partiesRepository.findAll<Party>();

      return parties;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findOne(id: number): Promise<Party> {
    try {
      const party: Party = await this.partiesRepository.findOne<Party>({ where: { id } });

      if (!party) {
        throw new NotFoundException(RECORD_NOT_FOUND);
      }

      return party;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async create(addPartyBodyDto: AddPartyBodyDto): Promise<Party> {
    try {
      const newParty: Party = await this.partiesRepository.create<Party>({
        imageUrl: 'foobar.jpg',
        ...addPartyBodyDto,
      });

      return newParty;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async update(id: number, updatePartyBodyDto: UpdatePartyBodyDto): Promise<Party> {
    try {
      const [, [updatedParty]] = await this.partiesRepository.update(updatePartyBodyDto, { where: { id }, returning: true });

      return updatedParty;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async destroy(id: number): Promise<void> {
    try {
      await this.partiesRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
