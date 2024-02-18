import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from './infrastructure.exception';

export class ListPairsDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(ListPairsDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.ListPairsDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when listing notifications';
  }
}

export class GetPairByNameDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(GetPairByNameDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.GetPairByNameDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when getting notification by code';
  }
}

export class AddPairDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(AddPairDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.AddPairDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when add notification';
  }
}

export class UpdatePairDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(UpdatePairDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.UpdatePairDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when update notification';
  }
}

export class RemovePairDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(RemovePairDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.RemovePairDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when remove notification';
  }
}
