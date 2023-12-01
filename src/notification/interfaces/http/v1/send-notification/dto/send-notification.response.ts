import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { ListNotificationsResponseDTO } from '../../list-notifications/dto/list-notifications.response';

export class SendNotificationResponseDTO {
  @IsBoolean()
  @ApiProperty({ description: 'indicator of successfully operation' })
  success: boolean;

  @ApiProperty({ description: 'new user data' })
  user: ListNotificationsResponseDTO;

  constructor(success: boolean, user: any) {
    this.success = success;
    this.user = user;
  }
}
