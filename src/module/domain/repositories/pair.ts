import { Result } from 'neverthrow';
import { PairEntity } from '../entities/pair.entity';
import {
  AddPairDatabaseException,
  GetPairByNameDatabaseException,
  ListPairsDatabaseException,
  RemovePairDatabaseException,
  UpdatePairDatabaseException,
} from '@module/infrastructure/exceptions/pair.exception';

export type ListPairsResult = Result<
  PairEntity[] | null,
  ListPairsDatabaseException
>;

export type GetPairByNameResult = Result<
  PairEntity | null,
  GetPairByNameDatabaseException
>;

export interface PairQueriesRepository {
  listPairs: () => Promise<ListPairsResult>;
  getPairByName: (name: string) => Promise<GetPairByNameResult>;
}

export type AddPairResult = Result<boolean, AddPairDatabaseException>;
export type UpdatePairResult = Result<
  PairEntity | null,
  UpdatePairDatabaseException
>;
export type RemovePairResult = Result<
  PairEntity | null,
  RemovePairDatabaseException
>;

export interface PairCommandsRepository {
  addPair: (pair: PairEntity) => Promise<AddPairResult>;
  // updatePair: (pair: PairEntity) => Promise<UpdatePairResult>;
  // removePair: (pairId: number) => Promise<RemovePairResult>;
}
