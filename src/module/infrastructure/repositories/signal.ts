/* eslint-disable prettier/prettier */
import { Inject, Logger } from '@nestjs/common';
import { err, ok } from 'neverthrow';
import { SignalEntity } from '@module/domain/entities/signal.entity';
import {
  AddSignalResult,
  SignalCommandsRepository,
} from '@module/domain/repositories/signal';
import {
  AddSignalDatabaseException,
} from '../exceptions/signal.exception';

// let notificationDataBase: NotificationEntity[] = [];

export class SignalCommandsImplement
  implements SignalCommandsRepository
{
  @Inject()
  private readonly logger: Logger;

  async addSignal(
    signal: SignalEntity,
  ): Promise<AddSignalResult> {
    try {
      console.log('signal add',signal);
      return ok(true);
    } catch (error) {
      this.logger.error(error, 'SignalCommandsImplement.addSignal');
      return err(new AddSignalDatabaseException());
    }
  }
}
