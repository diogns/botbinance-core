/* eslint-disable prettier/prettier */
import { Inject, Logger } from '@nestjs/common';
import { err, ok } from 'neverthrow';
import { AccountEntity } from '@module/domain/entities/account.entity';
import {
  AddAccountResult,
  AccountCommandsRepository,
} from '@module/domain/repositories/account';
import {
  AddAccountDatabaseException,
} from '../exceptions/account.exception';

// let notificationDataBase: NotificationEntity[] = [];

export class AccountCommandsImplement
  implements AccountCommandsRepository
{
  @Inject()
  private readonly logger: Logger;

  async addAccount(
    signal: AccountEntity,
  ): Promise<AddAccountResult> {
    try {
      console.log('signal add',signal);
      return ok(true);
    } catch (error) {
      this.logger.error(error, 'AccountCommandsImplement.addAccount');
      return err(new AddAccountDatabaseException());
    }
  }
}
