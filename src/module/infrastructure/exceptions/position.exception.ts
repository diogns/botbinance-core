import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from './infrastructure.exception';

export class ListPositionsDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(ListPositionsDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.ListPositionsDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when listing notifications';
  }
}

export class GetPositionByIdDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(GetPositionByIdDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.GetPositionByIdDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when getting notification by code';
  }
}

export class AddPositionDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(AddPositionDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.AddPositionDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when add notification';
  }
}

export class UpdatePositionDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(UpdatePositionDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.UpdatePositionDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when update notification';
  }
}

export class RemovePositionDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(RemovePositionDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.RemovePositionDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when remove notification';
  }
}
