/* eslint-disable prettier/prettier */
import { Inject, Logger } from '@nestjs/common';
import { err, ok } from 'neverthrow';
import { NotificationEntity } from '@notification/domain/entities/notification.entity';
import {
  AddNotificationResult,
  GetNotificationByIdResult,
  ListNotificationsResult,
  NotificationCommandsRepository,
  NotificationQueriesRepository,
} from '@notification/domain/repositories/notification';
import {
  AddNotificationDatabaseException,
  ListNotificationsDatabaseException,
  RemoveNotificationDatabaseException,
  UpdateNotificationDatabaseException,
  UpdateNotificationMessageDatabaseException,
} from '../exceptions/notification.exception';
import { DynamoDBService } from '@notification/infrastructure/aws/dynamo.aws';

let notificationDataBase: NotificationEntity[] = [];

export class NotificationQueriesImplement
  implements NotificationQueriesRepository
{
  @Inject()
  private readonly logger: Logger;

  async listNotifications(): Promise<ListNotificationsResult> {
    try {
      return ok(notificationDataBase);
    } catch (error) {
      this.logger.error(
        error,
        'NotificationQueriesImplement.listNotifications',
      );
      return err(new ListNotificationsDatabaseException());
    }
  }

  async getNotificationById(
    id: string,
  ): Promise<GetNotificationByIdResult> {
    try {
      const notification = notificationDataBase.find(
        (item) => item.id == id,
      );
      return ok(notification);
    } catch (error) {
      this.logger.error(
        error,
        'NotificationQueriesImplement.listNotifications',
      );
      return err(new ListNotificationsDatabaseException());
    }
  }
}

export class NotificationCommandsImplement
  implements NotificationCommandsRepository
{
  @Inject()
  private readonly logger: Logger;

  async addNotification(
    notification: NotificationEntity,
  ): Promise<AddNotificationResult> {
    try {
      console.log('infra add',notification);
      const newNotification = new NotificationEntity(
        notification.id,
        notification.datetime,
        notification.country,
        notification.userGroup,
        notification.app,
        notification.title,
        notification.subtitle,
        notification.message,
        notification.exp,
        notification.duration,
        notification.extraParams,
      );
      notificationDataBase.push(newNotification);
      await new DynamoDBService().createNotification(newNotification);
      return ok(newNotification);
    } catch (error) {
      this.logger.error(error, 'NotificationCommandsImplement.addNotification');
      return err(new AddNotificationDatabaseException());
    }
  }

  async updateNotification(
    notification: NotificationEntity,
  ): Promise<AddNotificationResult> {
    try {
      const notificationUpdate = notificationDataBase.find(
        (item) => item.id === notification.id,
      );
      notificationUpdate.userGroup = notification.userGroup;
      notificationUpdate.id = notification.id;
      notificationUpdate.title = notification.title;
      notificationUpdate.message = notification.message;
      notificationUpdate.app = notification.app;
      notificationUpdate.country = notification.country;
      notificationUpdate.exp = notification.exp;

      return ok(notificationUpdate);
    } catch (error) {
      this.logger.error(
        error,
        'NotificationCommandsImplement.updateNotification',
      );
      return err(new UpdateNotificationDatabaseException());
    }
  }
  
  async updateNotificationMessage(
    id: string,
    message: string,
  ): Promise<AddNotificationResult> {
    try {
      const notificationUpdate = notificationDataBase.find(
        (item) => item.id == id,
      );
      notificationUpdate.message = message;
      return ok(notificationUpdate);
    } catch (error) {
      this.logger.error(
        error,
        'NotificationCommandsImplement.updateNotificationMessage',
      );
      return err(new UpdateNotificationMessageDatabaseException());
    }
  }

  async removeNotification(
    id: string,
  ): Promise<AddNotificationResult> {
    try {
      const notificationDelete = notificationDataBase.find(
        (item) => item.id == id,
      );
      notificationDataBase = notificationDataBase.filter(
        (item) => item.id != id,
      );
      return ok(notificationDelete);
    } catch (error) {
      this.logger.error(
        error,
        'NotificationCommandsImplement.deleteNotification',
      );
      return err(new RemoveNotificationDatabaseException());
    }
  }
}
