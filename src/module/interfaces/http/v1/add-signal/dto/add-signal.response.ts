import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
//import { ListSignalsResponseDTO } from '../../list-notifications/dto/list-notifications.response';

export class AddSignalResponseDTO {
  @IsBoolean()
  @ApiProperty({ description: 'indicator of successfully operation' })
  success: boolean;

  @ApiProperty({ description: 'new notification data' })
  notification: any; //ListSignalsResponseDTO;

  constructor(success: boolean, notification: any) {
    this.success = success;
    this.notification = notification;
  }
}
