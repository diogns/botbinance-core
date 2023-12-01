import { Logger, Module } from '@nestjs/common';
import { NotificationGateway } from '@notification/interfaces/ws/v1/notification.gateway';

@Module({
  providers: [Logger, NotificationGateway],
})
export class NotificationGatewayModule {}
