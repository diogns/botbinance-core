import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  // SignalQueriesImplement,
  SignalCommandsImplement,
} from '@module/infrastructure/repositories/signal';
import { AddSignalController } from '@module/interfaces/http/v1/add-signal/add-signal.controller';
import { AddSignalHandler } from '@module/application/commands/add-signal';

const infrastructure = [
  // SignalQueriesImplement,
  SignalCommandsImplement,
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
