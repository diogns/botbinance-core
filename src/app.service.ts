import { Injectable } from '@nestjs/common';
import { AuroraManager } from './helpers/AuroraManager';

import { AccountEntity } from './module/infrastructure/entities/account.entity';
import { PairEntity } from './module/infrastructure/entities/pair.entity';
import { PositionSettingEntity } from './module/infrastructure/entities/position-setting.entity';
import { PositionEntity } from './module/infrastructure/entities/position.entity';
import { SignalEntity } from './module/infrastructure/entities/signal.entity';

type DBType = 'mysql' | 'oracle';
type ManagerDatasource = 'manager' | 'dataSource';

export const entities = [
  AccountEntity,
  PairEntity,
  PositionSettingEntity,
  PositionEntity,
  SignalEntity,
];

@Injectable()
export class AppService {
  static instanceDB: Record<DBType, Record<ManagerDatasource, any>> = {
    mysql: { manager: null, dataSource: null },
    oracle: { manager: null, dataSource: null },
  };

  async onModuleInit() {
    AppService.instanceDB.mysql = await AuroraManager.instance(entities);
  }

  async onModuleDestroy() {
    if (AppService.instanceDB.mysql)
      await AppService.instanceDB.mysql.dataSource.destroy();
    if (AppService.instanceDB.oracle)
      await AppService.instanceDB.oracle.dataSource.destroy();
  }
}
