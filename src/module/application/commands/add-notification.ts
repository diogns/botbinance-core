import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v1 as uuid } from 'uuid';

import { NotificationEntity } from '@module/domain/entities/notification.entity';
import { NotificationCommandsRepository } from '@module/domain/repositories/notification';
import { NotificationCommandsImplement } from '@module/infrastructure/repositories/notification';
import { AddNotificationResponseDTO } from '@module/interfaces/http/v1/add-signal/dto/add-signal.response';
// import { ListNotificationsResponseDTO } from '@module/interfaces/http/v1/list-notifications/dto/list-notifications.response';

// import { NotificationGateway } from '@notification/interfaces/ws/v1/notification.gateway';

export class AddNotificationCommand {
  constructor(
    readonly country: string,
    readonly userGroup: string,
    readonly app: string,
    readonly title: string,
    readonly subtitle: string,
    readonly message: string,
    readonly exp: number,
    readonly duration: number,
    readonly extraParams: string,
  ) {}
}

@CommandHandler(AddNotificationCommand)
export class AddNotificationHandler
  implements
    ICommandHandler<AddNotificationCommand, AddNotificationResponseDTO>
{
  constructor(
    @Inject(NotificationCommandsImplement)
    private readonly notificationRepository: NotificationCommandsRepository,
    // private readonly notificationGateway: NotificationGateway,
    private readonly logger: Logger,
  ) {}

  async execute(
    command: AddNotificationCommand,
  ): Promise<AddNotificationResponseDTO> {
    const id: string = uuid();
    const datetime: string = new Date()
      .toString()
      .replace(/T/, ':')
      .replace(/\.\w*/, '');

    const notificationEntity = new NotificationEntity(
      id,
      datetime,
      command.country,
      command.userGroup,
      command.app,
      command.title,
      command.subtitle,
      command.message,
      command.exp,
      command.duration,
      command.extraParams,
    );

    // save dynamo
    const result =
      await this.notificationRepository.addNotification(notificationEntity);
    if (result.isErr()) {
      this.logger.warn(result.error, 'AddNotificationHandler.execute');
      throw new InternalServerErrorException(
        result.error.message,
        result.error.code,
      );
    }

    const data = result.value;

    // const notificationsResponse = new ListNotificationsResponseDTO(
    //   data.userGroup,
    //   data.id,
    //   data.title,
    //   data.message,
    //   data.app,
    //   data.country,
    //   data.exp,
    // );
    // emit ws
    // this.notificationGateway.server
    //   .to(`room_${command.userGroup}`)
    //   .emit('new_message', notificationsResponse);

    return new AddNotificationResponseDTO(true, 'notificationsResponse');
  }
}
