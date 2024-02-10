import { Result } from 'neverthrow';
import { NotificationEntity } from '../entities/notification.entity';
import {
  AddNotificationDatabaseException,
  GetNotificationByIdDatabaseException,
  ListNotificationsDatabaseException,
  RemoveNotificationDatabaseException,
  UpdateNotificationDatabaseException,
  UpdateNotificationMessageDatabaseException,
} from '@module/infrastructure/exceptions/notification.exception';

export type ListNotificationsResult = Result<
  NotificationEntity[] | null,
  ListNotificationsDatabaseException
>;

export type GetNotificationByIdResult = Result<
  NotificationEntity | null,
  GetNotificationByIdDatabaseException
>;

export interface NotificationQueriesRepository {
  listNotifications: () => Promise<ListNotificationsResult>;
  getNotificationById: (
    notificationId: string,
  ) => Promise<GetNotificationByIdResult>;
}

export type AddNotificationResult = Result<
  NotificationEntity | null,
  AddNotificationDatabaseException
>;
export type updateNotificationResult = Result<
  NotificationEntity | null,
  UpdateNotificationDatabaseException
>;
export type updateNotificationEmailResult = Result<
  NotificationEntity | null,
  UpdateNotificationMessageDatabaseException
>;
export type removeNotificationResult = Result<
  NotificationEntity | null,
  RemoveNotificationDatabaseException
>;

export interface NotificationCommandsRepository {
  addNotification: (
    notification: NotificationEntity,
  ) => Promise<AddNotificationResult>;
  updateNotification: (
    notification: NotificationEntity,
  ) => Promise<AddNotificationResult>;
  updateNotificationMessage: (
    notificationId: string,
    notificationMessage: string,
  ) => Promise<AddNotificationResult>;
  removeNotification: (
    notificationId: string,
  ) => Promise<AddNotificationResult>;
}
