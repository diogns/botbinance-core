import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from './infrastructure.exception';

export class ListPositionsSettingsDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(ListPositionsSettingsDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.ListPositionsSettingsDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when listing notifications';
  }
}

export class GetPositionSettingByIdDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(GetPositionSettingByIdDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.GetPositionSettingByIdDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when getting notification by code';
  }
}

export class AddPositionSettingDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(AddPositionSettingDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.AddPositionSettingDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when add notification';
  }
}

export class UpdatePositionSettingDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(UpdatePositionSettingDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.UpdatePositionSettingDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when update notification';
  }
}

export class RemovePositionSettingDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(RemovePositionSettingDatabaseException.getMessage());
    this.code =
      InfrastructureExceptionCode.RemovePositionSettingDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when remove notification';
  }
}
