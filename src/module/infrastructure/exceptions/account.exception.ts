import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from './infrastructure.exception';

export class ListAccountsDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(ListAccountsDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.ListAccountsDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when listing notifications';
  }
}

export class GetAccountByIdDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(GetAccountByIdDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.GetAccountByIdDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when getting notification by code';
  }
}

export class AddAccountDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(AddAccountDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.AddAccountDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when add notification';
  }
}

export class UpdateAccountDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(UpdateAccountDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.UpdateAccountDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when update notification';
  }
}

export class RemoveAccountDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(RemoveAccountDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.RemoveAccountDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when remove notification';
  }
}
