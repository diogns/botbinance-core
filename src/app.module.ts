import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './healthcheck.controller';

import { NotificationModule } from '@module/infrastructure/nestjs/module';

@Module({
  imports: [
    NotificationModule,
    TerminusModule,
    HttpModule,
    ConfigModule.forRoot(),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
