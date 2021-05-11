import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { runSeeder, tearDownDatabase, useSeeding } from 'typeorm-seeding';
import { setupValidateContainer } from '@scgwedotech/nestjs-error-handling';
import { useContainer } from 'class-validator';
import { promises as fs } from 'fs';

import { getModules, setupApp } from '../src/app.util';
import { SeederConstructor } from 'typeorm-seeding/dist/types';

export class Base {
  private app: INestApplication;

  public async init(): Promise<void> {
    await this.setupApp();
    // await this.setupDatabase();
    await this.app.init();
  }

  public getApp(): INestApplication {
    return this.app;
  }

  private async setupApp(): Promise<void> {
    const module: TestingModule = await Test.createTestingModule({
      imports: getModules(),
    }).compile();
    this.app = module.createNestApplication();
    setupApp(this.app);
    setupValidateContainer(useContainer, this.app);
  }

  // private async setupDatabase(): Promise<void> {
  //   await useSeeding();

  //   // run all seeds in migration path
  //   const seedsPath: string = /.+?(?=\/\*)/.exec(ormconfig.seeds[0])[0];
  //   const seedFiles: string[] = await fs.readdir(seedsPath);
  //   for (const seedFile of seedFiles) {
  //     // eslint-disable-next-line @typescript-eslint/no-var-requires
  //     const { default: seed }: { default: SeederConstructor } = require(`../${seedsPath}/${seedFile}`);
  //     await runSeeder(seed);
  //   }
  // }

  public async close(): Promise<void> {
    await this.app.close();
    await tearDownDatabase();
  }

}
