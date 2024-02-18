import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './healthcheck.controller';
import { AppService } from './app.service';

import { NestModule } from '@module/infrastructure/nestjs/module';

@Module({
  imports: [NestModule, TerminusModule, HttpModule, ConfigModule.forRoot()],
  controllers: [HealthController],
  providers: [AppService],
})
export class AppModule {}
