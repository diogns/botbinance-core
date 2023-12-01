import { Body, Controller, Post, Req, Version } from '@nestjs/common';

import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDescription } from '../response-description';
import { GeneralResponse } from '../../general.response';
import { AddNotificationCommand } from '@notification/application/commands/add-notification';
import { AddNotificationResponseDTO } from './dto/add-notification.response';
import { AddNotificationRequestDTO } from './dto/add-notification.request';
import * as rawbody from 'raw-body';

@ApiTags('Notifications')
@Controller('notification')
export class AddNotificationsController {
  constructor(readonly commandBus: CommandBus) {}

  @Version('1')
  @Post()
  @ApiCreatedResponse({
    description: ResponseDescription.OK,
    type: AddNotificationResponseDTO,
  })
  @ApiBadRequestResponse({
    description: ResponseDescription.BAD_REQUEST,
    type: GeneralResponse,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
    type: GeneralResponse,
  })
  //async addNotifications(@Body() body: any, @Req() req: any) {
  async addUser(@Body() notification: AddNotificationRequestDTO) {

    // if (req.readable) {
    //   const raw = await rawbody(req);
    //   const text = raw.toString().trim();
    //   console.log('body:', text);
    // } else {
    //   console.log('controller add body', body);
    // }
    // return 'ok';

    const query = new AddNotificationCommand(
      notification.country,
      notification.user_group,
      notification.app,
      notification.title,
      notification.subtitle,
      notification.message,
      notification.exp,
      notification.duration,
      notification.extra_params,
    );
    return this.commandBus.execute(query);
  }
}
