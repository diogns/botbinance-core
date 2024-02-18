import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SignalEntity } from '@module/domain/entities/signal.entity';
import { SignalCommandsRepository } from '@module/domain/repositories/signal';
import { SignalCommandsImplement } from '@module/infrastructure/repositories/signal';
import { PairCommandsRepository } from '@module/domain/repositories/pair';
import { SignalCommandsImplement } from '@module/infrastructure/repositories/signal';
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
    private readonly signalCommandsRepository: SignalCommandsRepository,
    @Inject(SignalCommandsImplement)
    private readonly signalCommandsRepository: SignalCommandsRepository,
    private readonly logger: Logger,
  ) {}

  async execute(command: AddSignalCommand): Promise<AddSignalResponseDTO> {
    const signalInstance = new SignalEntity(
      command.value,
      command.pair,
      command.signal,
    );
    console.log(signalInstance);
    const result =
      await this.signalCommandsRepository.addSignal(signalInstance);
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
