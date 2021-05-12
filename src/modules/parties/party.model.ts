import { Table, Column, Model, BelongsToMany, BelongsTo, ForeignKey, DefaultScope } from 'sequelize-typescript';
import { UserParty } from '../user-parties/user-party.model';
import { User } from '../users/user.model';

@DefaultScope(() => ({
  include: [
    { model: User, as: 'users' },
    { model: User, as: 'createdBy' },
    { model: User, as: 'updatedBy' },
  ],
}))
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

  @ForeignKey(() => User)
  public createdById: number;

  @BelongsTo(() => User, { foreignKey: 'createdById'})
  public createdBy: User;

  @ForeignKey(() => User)
  public updatedById: number;

  @BelongsTo(() => User, { foreignKey: 'updatedById'})
  public updatedBy: User;
}
