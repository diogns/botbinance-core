import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from './infrastructure.exception';

export class ListNotificationsDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(ListNotificationsDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.ListNotificationsDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when listing notifications';
  }
}

export class GetNotificationByIdDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(GetNotificationByIdDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.GetNotificationByIdDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when getting notification by code';
  }
}

export class AddNotificationDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(AddNotificationDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.AddNotificationDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when add notification';
  }
}

export class UpdateNotificationDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(UpdateNotificationDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.UpdateNotificationDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when update notification';
  }
}

export class UpdateNotificationMessageDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(UpdateNotificationMessageDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.UpdateNotificationMessageDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when update notification message';
  }
}

export class RemoveNotificationDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(RemoveNotificationDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.RemoveNotificationDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when remove notification';
  }
}
