import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { UserParty } from '../user-parties/user-party.model';
import { User } from '../users/user.model';

@Table({ tableName: 'parties' })
export class Party extends Model {
  @Column
  public imageUrl: string;

  @Column
  public imageKey: string;

  @Column
  public name: string;

  @Column
  public maxMembers: number;

  @BelongsToMany(() => User, () => UserParty)
  public users: Array<User & { userParty: UserParty }>;
}
