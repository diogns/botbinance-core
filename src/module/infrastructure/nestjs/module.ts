import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SignalCommandsImplement } from '@module/infrastructure/repositories/signal';
import { PairCommandsImplement } from '@module/infrastructure/repositories/pair';
import { AccountCommandsImplement } from '@module/infrastructure/repositories/account';
import { PositionCommandsImplement } from '@module/infrastructure/repositories/position';
import { PositionSettingCommandsImplement } from '@module/infrastructure/repositories/position-setting';

import { AddSignalController } from '@module/interfaces/http/v1/add-signal/add-signal.controller';
import { AddSignalHandler } from '@module/application/commands/add-signal';

const infrastructure = [
  SignalCommandsImplement,
  PairCommandsImplement,
  AccountCommandsImplement,
  PositionCommandsImplement,
  PositionSettingCommandsImplement,
];
const controllers = [AddSignalController];
const domain = [];
const application = [AddSignalHandler];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class NestModule {}
