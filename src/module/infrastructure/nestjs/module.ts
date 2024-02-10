import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  NotificationQueriesImplement,
  NotificationCommandsImplement,
} from '@module/infrastructure/repositories/notification';
import { AddNotificationsController } from '@module/interfaces/http/v1/add-signal/add-signal.controller';
import { AddNotificationHandler } from '@module/application/commands/add-notification';

const infrastructure = [
  NotificationQueriesImplement,
  NotificationCommandsImplement,
];
const controllers = [AddNotificationsController];
const domain = [];
const application = [AddNotificationHandler];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [
    Logger,
    // NotificationGateway,
    // MessageService,
    ...infrastructure,
    ...application,
    ...domain,
  ],
})
export class NotificationModule {}
