import { User } from '../../user.model';
import { GetUserQueryDto } from '../../dto/queries/get-user-query.dto';
import { UpdateUserBodyDto } from '../../dto/bodies/update-user-body.dto';
import { AddUserBodyDto } from '../../dto/bodies/add-user-body.dto';
export interface IUsersService {
  findAll(query: GetUserQueryDto): Promise<User[]>;
  findOne(id: number): Promise<User>;
  findByEmail(username: string): Promise<User>;
  create(addUserBodyDto: AddUserBodyDto): Promise<User>;
  update(id: number, updateUserBodyDto: UpdateUserBodyDto): Promise<User>
}
