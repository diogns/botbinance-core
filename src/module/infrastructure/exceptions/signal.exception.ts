import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from './infrastructure.exception';

export class ListSignalsDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(ListSignalsDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.ListSignalsDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when listing signals';
  }
}

export class AddSignalDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(AddSignalDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.AddSignalDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when add signal';
  }
}
