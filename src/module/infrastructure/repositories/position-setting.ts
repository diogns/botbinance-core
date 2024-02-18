/* eslint-disable prettier/prettier */
import { Inject, Logger } from '@nestjs/common';
import { err, ok } from 'neverthrow';
import { PositionSettingEntity } from '@module/domain/entities/position-setting.entity';
import {
  AddPositionSettingResult,
  PositionSettingCommandsRepository,
} from '@module/domain/repositories/position-setting';
import {
    AddPositionSettingDatabaseException,
} from '../exceptions/position-setting.exception';

// let notificationDataBase: NotificationEntity[] = [];

export class PositionSettingCommandsImplement
  implements PositionSettingCommandsRepository
{
  @Inject()
  private readonly logger: Logger;

  async addPositionSetting(
    positionSetting: PositionSettingEntity,
  ): Promise<AddPositionSettingResult> {
    try {
      console.log('position add',positionSetting);
      return ok(true);
    } catch (error) {
      this.logger.error(error, 'PositionSettingCommandsImplement.addPositionSetting');
      return err(new AddPositionSettingDatabaseException());
    }
  }
}
