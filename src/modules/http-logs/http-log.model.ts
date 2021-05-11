import { Table, Column, Model } from 'sequelize-typescript';
import { HttpLogType } from 'src/constants';
@Table({ tableName: 'http_logs' })
export class HttpLog extends Model {
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
