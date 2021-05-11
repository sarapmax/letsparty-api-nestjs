import { HttpLogType } from 'src/constants';

export interface IHttpLog {
  type: HttpLogType,
  httpStatusCode: number,
  url: string,
  requestData: string,
  description: string
}
