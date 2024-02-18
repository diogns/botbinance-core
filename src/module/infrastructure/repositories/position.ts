/* eslint-disable prettier/prettier */
import { Inject, Logger } from '@nestjs/common';
import { err, ok } from 'neverthrow';
import { PositionEntity } from '@module/domain/entities/position.entity';
import {
  AddPositionResult,
  PositionCommandsRepository,
} from '@module/domain/repositories/position';
import {
  AddPositionDatabaseException,
} from '../exceptions/position.exception';

// let notificationDataBase: NotificationEntity[] = [];

export class PositionCommandsImplement
  implements PositionCommandsRepository
{
  @Inject()
  private readonly logger: Logger;

  async addPosition(
    position: PositionEntity,
  ): Promise<AddPositionResult> {
    try {
      console.log('position add',position);
      return ok(true);
    } catch (error) {
      this.logger.error(error, 'PositionCommandsImplement.addPosition');
      return err(new AddPositionDatabaseException());
    }
  }
}
