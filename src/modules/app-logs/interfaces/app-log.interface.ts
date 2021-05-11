import { HttpLogType } from 'src/constants';

export interface IAppLog {
  type: HttpLogType,
  httpStatusCode: number,
  url: string,
  requestData: string,
  description: string
}
