import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'password_resets' })
export class PasswordReset extends Model {
  @Column
  public email: string;

  @Column
  public token: string;

  @Column
  public expiredAt: Date;
}
