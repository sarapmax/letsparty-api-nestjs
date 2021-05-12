import { Table, Model, ForeignKey } from 'sequelize-typescript';
import { Party } from '../parties/party.model';
import { User } from '../users/user.model';

@Table({ tableName: 'user_parties' })
export class UserParty extends Model {
  @ForeignKey(() => User)
  public userId: number;

  @ForeignKey(() => Party)
  public partyId: number;
}
