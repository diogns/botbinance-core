export enum InfrastructureExceptionCode {
  Default = 'DEFAULT_INFRA_EXCEPTION',
  ListNotificationsDatabaseExceptionCode = 'LIST_NOTIFICATIONS_DATABASE_EXCEPTION',
  AddNotificationDatabaseExceptionCode = 'ADD_NOTIFICATION_DATABASE_EXCEPTION',
  UpdateNotificationDatabaseExceptionCode = 'UPDATE_NOTIFICATION_DATABASE_EXCEPTION',
  UpdateNotificationMessageDatabaseExceptionCode = 'UPDATE_NOTIFICATION_MESSAGE_DATABASE_EXCEPTION',
  RemoveNotificationDatabaseExceptionCode = 'REMOVE_NOTIFICATION_DATABASE_EXCEPTION',
  GetNotificationByIdDatabaseExceptionCode = 'GET_NOTIFICATION_BY_ID_DATABASE_EXCEPTION',

  AddSignalDatabaseExceptionCode = 'ADD_SIGNAL_DATABASE_EXCEPTION',
  ListSignalsDatabaseExceptionCode = 'LIST_SIGNALS_DATABASE_EXCEPTION',

  ListPairsDatabaseExceptionCode = 'LIST_PAIRS_DATABASE_EXCEPTION',
  AddPairDatabaseExceptionCode = 'ADD_PAIR_DATABASE_EXCEPTION',
  UpdatePairDatabaseExceptionCode = 'UPDATE_PAIR_DATABASE_EXCEPTION',
  RemovePairDatabaseExceptionCode = 'REMOVE_PAIR_DATABASE_EXCEPTION',
  GetPairByNameDatabaseExceptionCode = 'GET_PAIR_BY_NAME_DATABASE_EXCEPTION',

  ListAccountsDatabaseExceptionCode = 'LIST_ACCOUNTS_DATABASE_EXCEPTION',
  AddAccountDatabaseExceptionCode = 'ADD_ACCOUNT_DATABASE_EXCEPTION',
  UpdateAccountDatabaseExceptionCode = 'UPDATE_ACCOUNT_DATABASE_EXCEPTION',
  RemoveAccountDatabaseExceptionCode = 'REMOVE_ACCOUNT_DATABASE_EXCEPTION',
  GetAccountByIdDatabaseExceptionCode = 'GET_ACCOUNT_BY_NAME_DATABASE_EXCEPTION',

  ListPositionsDatabaseExceptionCode = 'LIST_POSITIONS_DATABASE_EXCEPTION',
  AddPositionDatabaseExceptionCode = 'ADD_POSITION_DATABASE_EXCEPTION',
  UpdatePositionDatabaseExceptionCode = 'UPDATE_POSITIONT_DATABASE_EXCEPTION',
  RemovePositionDatabaseExceptionCode = 'REMOVE_POSITION_DATABASE_EXCEPTION',
  GetPositionByIdDatabaseExceptionCode = 'GET_POSITION_BY_NAME_DATABASE_EXCEPTION',

  ListPositionsSettingsDatabaseExceptionCode = 'LIST_POSITIONSSETTINGS_DATABASE_EXCEPTION',
  AddPositionSettingDatabaseExceptionCode = 'ADD_POSITIONSETTING_DATABASE_EXCEPTION',
  UpdatePositionSettingDatabaseExceptionCode = 'UPDATE_POSITIONTSETTING_DATABASE_EXCEPTION',
  RemovePositionSettingDatabaseExceptionCode = 'REMOVE_POSITIONSETTING_DATABASE_EXCEPTION',
  GetPositionSettingByIdDatabaseExceptionCode = 'GET_POSITIONSETTING_BY_NAME_DATABASE_EXCEPTION',
}

export abstract class InfrastructureException extends Error {
  code: string;

  constructor(message?: string) {
    super(message);

    this.code = InfrastructureExceptionCode.Default;
  }
}
