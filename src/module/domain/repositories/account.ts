import { Result } from 'neverthrow';
import { AccountEntity } from '../entities/account.entity';
import {
  AddAccountDatabaseException,
  GetAccountByIdDatabaseException,
  ListAccountsDatabaseException,
  RemoveAccountDatabaseException,
  UpdateAccountDatabaseException,
} from '@module/infrastructure/exceptions/account.exception';

export type ListAccountsResult = Result<
  AccountEntity[] | null,
  ListAccountsDatabaseException
>;

export type GetAccountByIdResult = Result<
  AccountEntity | null,
  GetAccountByIdDatabaseException
>;

export interface AccountQueriesRepository {
  listAccounts: () => Promise<ListAccountsResult>;
  getAccountById: (accountId: string) => Promise<GetAccountByIdResult>;
}

export type AddAccountResult = Result<boolean, AddAccountDatabaseException>;
export type updateAccountResult = Result<
  AccountEntity | null,
  UpdateAccountDatabaseException
>;

export type removeAccountResult = Result<
  AccountEntity | null,
  RemoveAccountDatabaseException
>;

export interface AccountCommandsRepository {
  addAccount: (account: AccountEntity) => Promise<AddAccountResult>;
  // updateAccount: (account: AccountEntity) => Promise<AddAccountResult>;
  // removeAccount: (accountId: string) => Promise<AddAccountResult>;
}
