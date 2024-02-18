import { Result } from 'neverthrow';
import { PositionEntity } from '../entities/position.entity';
import {
  AddPositionDatabaseException,
  GetPositionByIdDatabaseException,
  ListPositionsDatabaseException,
  RemovePositionDatabaseException,
  UpdatePositionDatabaseException,
} from '@module/infrastructure/exceptions/position.exception';

export type ListPositionsResult = Result<
  PositionEntity[] | null,
  ListPositionsDatabaseException
>;

export type GetPositionByIdResult = Result<
  PositionEntity | null,
  GetPositionByIdDatabaseException
>;

export interface PositionQueriesRepository {
  listPositions: () => Promise<ListPositionsResult>;
  getPositionById: (positionId: string) => Promise<GetPositionByIdResult>;
}

export type AddPositionResult = Result<boolean, AddPositionDatabaseException>;
export type UpdatePositionResult = Result<
  PositionEntity | null,
  UpdatePositionDatabaseException
>;

export type RemovePositionResult = Result<
  PositionEntity | null,
  RemovePositionDatabaseException
>;

export interface PositionCommandsRepository {
  addPosition: (position: PositionEntity) => Promise<AddPositionResult>;
  // updatePosition: (position: PositionEntity) => Promise<UpdatePositionResult>;
  // removePosition: (positionId: string) => Promise<RemovePositionResult>;
}
