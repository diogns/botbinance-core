import { Result } from 'neverthrow';
import { SignalEntity } from '../entities/signal.entity';
import {
  AddSignalDatabaseException,
  ListSignalsDatabaseException,
} from '@module/infrastructure/exceptions/signal.exception';

export type ListSignalsResult = Result<
  SignalEntity[] | null,
  ListSignalsDatabaseException
>;

export interface SignalQueriesRepository {
  listSignals: () => Promise<ListSignalsResult>;
}

export type AddSignalResult = Result<boolean, AddSignalDatabaseException>;

export interface SignalCommandsRepository {
  addSignal: (signal: SignalEntity) => Promise<AddSignalResult>;
}
