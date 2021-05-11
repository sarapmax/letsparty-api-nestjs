import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppHealthIndicator extends HealthIndicator {
  constructor(private sequelize: Sequelize) {
    super();
  }

  public async isHealthy(key: string): Promise<HealthIndicatorResult> {
    let isHealthy: boolean = false;
    let error: string = '';

    await this.sequelize
      .authenticate()
      .then(() => {
        isHealthy = true;
      })
      .catch((err: string) => {
        isHealthy = false;
        error = err;
      });

    const result: HealthIndicatorResult = this.getStatus(key, isHealthy, { error });

    if (isHealthy) {
      return result;
    }

    throw new HealthCheckError('Health check failed', result);
  }
}
