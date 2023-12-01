import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  NotificationQueriesImplement,
  NotificationCommandsImplement,
} from '@notification/infrastructure/repositories/notification';
import { AddNotificationsController } from '@notification/interfaces/http/v1/add-notification/add-notification.controller';
import { TestController } from '@notification/interfaces/http/v1/page-0/add-notification.controller';

import { NotificationGateway } from '@notification/interfaces/ws/v1/notification.gateway';
import { MessageService } from '@notification/application/ws-handler/message-handler';

import { AddNotificationHandler } from '@notification/application/commands/add-notification';

const infrastructure = [
  NotificationQueriesImplement,
  NotificationCommandsImplement,
];
const controllers = [AddNotificationsController, TestController];
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
