import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { ListNotificationsResponseDTO } from '../../list-notifications/dto/list-notifications.response';

export class AddNotificationResponseDTO {
  @IsBoolean()
  @ApiProperty({ description: 'indicator of successfully operation' })
  success: boolean;

  @ApiProperty({ description: 'new notification data' })
  notification: ListNotificationsResponseDTO;

  constructor(success: boolean, notification: ListNotificationsResponseDTO) {
    this.success = success;
    this.notification = notification;
  }
}
