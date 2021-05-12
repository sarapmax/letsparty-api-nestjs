import { Table, Column, Model } from 'sequelize-typescript';
@Table({ tableName: 'users' })
export class User extends Model {
  @Column
  public email: string;

  @Column
  public password: string;

  @Column
  public fullName: string;

  @Column
  public avatarUrl: string;

  @Column
  public avatarKey: string;
}
