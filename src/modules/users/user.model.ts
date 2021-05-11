import { Table, Column, Model } from 'sequelize-typescript';
@Table({ tableName: 'users' })
export class User extends Model {
  @Column
  public email: string;

  @Column
  public firstName: string;

  @Column
  public lastName: string;
}
