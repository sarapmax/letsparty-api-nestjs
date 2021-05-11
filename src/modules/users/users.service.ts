import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { AddUserBodyDto } from './dto/bodies/add-user-body.dto';
import { UpdateUserBodyDto } from './dto/bodies/update-user-body.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RECORD_NOT_FOUND } from 'src/constants';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private usersRepository: typeof User,
  ) { }

  public async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.usersRepository.findAll<User>();

      return users;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findOne(id: number): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOne<User>({ where: { id } });

      if (!user) {
        throw new NotFoundException(RECORD_NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async verifyById(id: number): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOne<User>({ where: { id } });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findByEmail(email: string): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOne<User>({ where: { email } });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async create(addUserBodyDto: AddUserBodyDto): Promise<User> {
    try {
      // hash the password
      const hashedPassword: string = await this.hashPassword(addUserBodyDto.password);
      const newUser: User = await this.usersRepository.create<User>({
        ...addUserBodyDto,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async update(id: number, updateUserBodyDto: UpdateUserBodyDto): Promise<User> {
    try {
      // hash the password
      const hashedPassword: string = await this.hashPassword(updateUserBodyDto.password);
      const [, [updatedUser]] = await this.usersRepository.update(
        { ...updateUserBodyDto, password: hashedPassword },
        { where: { id }, returning: true }
      );

      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async destroy(id: number): Promise<void> {
    try {
      await this.usersRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const hash: string = await bcrypt.hash(password, 10);
    return hash;
  }
}
