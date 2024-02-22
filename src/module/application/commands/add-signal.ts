import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SignalEntity } from '@module/domain/entities/signal.entity';

import { SignalCommandsImplement } from '@module/infrastructure/repositories/signal';
import { SignalCommandsRepository } from '@module/domain/repositories/signal';

import { PairCommandsImplement } from '@module/infrastructure/repositories/pair';
import { PairCommandsRepository } from '@module/domain/repositories/pair';

import { PositionCommandsImplement } from '@module/infrastructure/repositories/position';
import { PositionCommandsRepository } from '@module/domain/repositories/position';

import { PositionSettingCommandsImplement } from '@module/infrastructure/repositories/position-setting';
import { PositionSettingCommandsRepository } from '@module/domain/repositories/position-setting';

import { AccountCommandsImplement } from '@module/infrastructure/repositories/account';
import { AccountCommandsRepository } from '@module/domain/repositories/account';

import { AddSignalResponseDTO } from '@module/interfaces/http/v1/add-signal/dto/add-signal.response';

export class AddSignalCommand {
  constructor(
    readonly pair: string,
    readonly signal: string,
    readonly value: number,
  ) {}
}

@CommandHandler(AddSignalCommand)
export class AddSignalHandler
  implements ICommandHandler<AddSignalCommand, AddSignalResponseDTO>
{
  constructor(
    @Inject(SignalCommandsImplement)
    private readonly signalRepository: SignalCommandsRepository,

    @Inject(PairCommandsImplement)
    private readonly PairRepository: PairCommandsRepository,

    @Inject(PositionCommandsImplement)
    private readonly positionRepository: PositionCommandsRepository,

    @Inject(PositionSettingCommandsImplement)
    private readonly positionSettingRepository: PositionSettingCommandsRepository,

    @Inject(AccountCommandsImplement)
    private readonly accountRepository: AccountCommandsRepository,
    private readonly logger: Logger,
  ) {}

  async execute(command: AddSignalCommand): Promise<AddSignalResponseDTO> {
    const signalInstance = new SignalEntity(
      command.value,
      command.pair,
      command.signal,
    );
    console.log(signalInstance);
    const result = await this.signalRepository.addSignal(signalInstance);
    if (result.isErr()) {
      this.logger.warn(result.error, 'AddSignalHandler.execute');
      throw new InternalServerErrorException(
        result.error.message,
        result.error.code,
      );
    }

    return new AddSignalResponseDTO(true, 'notificationsResponse');
  }
}
