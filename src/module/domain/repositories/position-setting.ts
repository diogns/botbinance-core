import { Result } from 'neverthrow';
import { PositionSettingEntity } from '../entities/position-setting.entity';
import {
  AddPositionSettingDatabaseException,
  GetPositionSettingByIdDatabaseException,
  ListPositionsSettingsDatabaseException,
  RemovePositionSettingDatabaseException,
  UpdatePositionSettingDatabaseException,
} from '@module/infrastructure/exceptions/position-setting.exception';

export type ListPositionSettingsResult = Result<
  PositionSettingEntity[] | null,
  ListPositionsSettingsDatabaseException
>;

export type GetPositionSettingByIdResult = Result<
  PositionSettingEntity | null,
  GetPositionSettingByIdDatabaseException
>;

export interface PositionSettingQueriesRepository {
  listPositionSettings: () => Promise<ListPositionSettingsResult>;
  getPositionSettingById: (
    notificationId: string,
  ) => Promise<GetPositionSettingByIdResult>;
}

export type AddPositionSettingResult = Result<
  boolean,
  AddPositionSettingDatabaseException
>;
export type updatePositionSettingResult = Result<
  PositionSettingEntity | null,
  UpdatePositionSettingDatabaseException
>;
export type removePositionSettingResult = Result<
  PositionSettingEntity | null,
  RemovePositionSettingDatabaseException
>;

export interface PositionSettingCommandsRepository {
  addPositionSetting: (
    notification: PositionSettingEntity,
  ) => Promise<AddPositionSettingResult>;
  // updatePositionSetting: (
  //   notification: PositionSettingEntity,
  // ) => Promise<AddPositionSettingResult>;
  // removePositionSetting: (
  //   notificationId: string,
  // ) => Promise<AddPositionSettingResult>;
}
