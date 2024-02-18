import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Parameters } from './Parameters';
import type { Instance } from './Types';

type IDBConfig = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  logging: boolean;
  poolSize: number;
  migrationsTableName?: string;
  migrations?: string[];
  migrationsRun?: boolean;
};

export class AuroraManager {
  private static logger = new Logger();

  static async instance(entities: any[]): Promise<Instance> {
    const config = await this.getDbConfig();
    const dataSource = await this.getDataSource(config, entities)
      .initialize()
      .catch(AuroraManager.failToConnectToDatabase);

    return {
      manager: (dataSource as DataSource).manager,
      dataSource: dataSource,
    };
  }

  static getDataSource(config: IDBConfig, entities: any[]) {
    return new DataSource({
      type: 'mysql',
      ...config,
      entities,
    });
  }

  static async getDbConfig(): Promise<IDBConfig> {
    return {
      ...Parameters.localAuroraConfig,
      ...Parameters.defaultAuroraConfig,
    };
  }

  private static failToConnectToDatabase(error: Error) {
    console.error('Fail to connect to database Aurora', error);
    process.exit(1);
  }
}
