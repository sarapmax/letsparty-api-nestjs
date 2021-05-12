import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Party } from './party.model';
import { AddPartyBodyDto } from './dto/bodies/add-party-body.dto';
import { UpdatePartyBodyDto } from './dto/bodies/update-party-body.dto';
import { InjectModel } from '@nestjs/sequelize';
import { S3UploadService } from '../core/s3-upload/s3-upload.service';
import { S3 } from 'aws-sdk';
import { User } from '../users/user.model';

@Injectable()
export class PartiesService {
  constructor(
    @InjectModel(Party) private partiesRepository: typeof Party,
    @Inject(S3UploadService) private s3UploadService: S3UploadService,
  ) { }

  public async findAll(): Promise<Party[]> {
    try {
      const parties: Party[] = await this.partiesRepository.findAll<Party>({
        include: [User],
      });

      return parties;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findOne(id: number): Promise<Party> {
    try {
      const party: Party = await this.partiesRepository.findOne<Party>({
        include: [User],
        where: { id },
      });

      return party;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async create(image: Express.Multer.File, addPartyBodyDto: AddPartyBodyDto): Promise<Party> {
    try {
      const { Location, Key }: S3.ManagedUpload.SendData = await this.s3UploadService.upload(image, image.originalname);

      const newParty: Party = await this.partiesRepository.create<Party>({
        imageUrl: Location,
        imageKey: Key,
        ...addPartyBodyDto,
      });

      return newParty;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async update(id: number, newImage: Express.Multer.File, updatePartyBodyDto: UpdatePartyBodyDto): Promise<Party> {
    try {
      const existingParty: Party = await this.findOne(id);

      if (newImage) {
        await this.s3UploadService.delete(existingParty.imageKey);

        const { Location, Key }: S3.ManagedUpload.SendData = await this.s3UploadService.upload(newImage, newImage.originalname);
        existingParty.imageUrl = Location;
        existingParty.imageKey = Key;
      }

      const [, [updatedParty]] = await this.partiesRepository.update({
        ...updatePartyBodyDto,
        imageUrl: existingParty.imageUrl,
        imageKey: existingParty.imageKey,
      }, { where: { id }, returning: true });

      return updatedParty;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async destroy(id: number): Promise<void> {
    try {
      const existingParty: Party = await this.findOne(id);
      await this.s3UploadService.delete(existingParty.imageKey);
      await this.partiesRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
