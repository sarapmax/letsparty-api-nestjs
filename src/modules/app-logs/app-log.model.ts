import { Table, Column, Model } from 'sequelize-typescript';
import { HttpLogType } from 'src/constants';
@Table({ tableName: 'app_logs' })
export class AppLog extends Model {
  @Column
  public type: HttpLogType;

  @Column
  public httpStatusCode: number;

  @Column
  public url: string;

  @Column
  public requestData: string;

  @Column
  public description: string;
}
