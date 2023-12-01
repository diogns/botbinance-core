export enum InfrastructureExceptionCode {
  Default = 'DEFAULT_INFRA_EXCEPTION',
  ListNotificationsDatabaseExceptionCode = 'LIST_NOTIFICATIONS_DATABASE_EXCEPTION',
  AddNotificationDatabaseExceptionCode = 'ADD_NOTIFICATION_DATABASE_EXCEPTION',
  UpdateNotificationDatabaseExceptionCode = 'UPDATE_NOTIFICATION_DATABASE_EXCEPTION',
  UpdateNotificationMessageDatabaseExceptionCode = 'UPDATE_NOTIFICATION_MESSAGE_DATABASE_EXCEPTION',
  RemoveNotificationDatabaseExceptionCode = 'REMOVE_NOTIFICATION_DATABASE_EXCEPTION',
  GetNotificationByIdDatabaseExceptionCode = 'GET_NOTIFICATION_BY_ID_DATABASE_EXCEPTION',
}

export abstract class InfrastructureException extends Error {
  code: string;

  constructor(message?: string) {
    super(message);

    this.code = InfrastructureExceptionCode.Default;
  }
}
