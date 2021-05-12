import { Table, Column, Model } from 'sequelize-typescript';

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
}
