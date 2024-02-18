/* eslint-disable prettier/prettier */
import { Inject, Logger } from '@nestjs/common';
import { err, ok } from 'neverthrow';
import { PairEntity } from '@module/domain/entities/pair.entity';
import {
  AddPairResult,
  PairCommandsRepository,
} from '@module/domain/repositories/pair';
import {
  AddPairDatabaseException,
} from '../exceptions/pair.exception';

// let notificationDataBase: NotificationEntity[] = [];

export class PairCommandsImplement
  implements PairCommandsRepository
{
  @Inject()
  private readonly logger: Logger;

  async addPair(
    signal: PairEntity,
  ): Promise<AddPairResult> {
    try {
      console.log('signal add',signal);
      return ok(true);
    } catch (error) {
      this.logger.error(error, 'PairCommandsImplement.addPair');
      return err(new AddPairDatabaseException());
    }
  }
}
