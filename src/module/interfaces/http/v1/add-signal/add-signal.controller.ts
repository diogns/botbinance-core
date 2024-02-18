import {
  Body,
  Controller,
  Post,
  Req,
  RawBodyRequest,
  Version,
} from '@nestjs/common';
import { Request } from 'express';

import { CommandBus } from '@nestjs/cqrs';

import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDescription } from '../response-description';
import { GeneralResponse } from '../../general.response';
import { AddNotificationCommand } from '@module/application/commands/add-notification';
import { AddNotificationResponseDTO } from './dto/add-signal.response';
import { AddSignalRequestDTO } from './dto/add-signal.request';

@ApiTags('Signals')
@Controller('signal')
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
  // async addNotifications(@Body() body: any, @Req() req: any) {
  //   console.log('here!');
  //   if (req.readable) {
  //     const raw = await rawbody(req);
  //     const text = raw.toString().trim();
  //     console.log('body:', text);
  //   } else {
  //     console.log(' controller add body', body);
  //   }
  create(@Req() req: RawBodyRequest<Request>) {
    const raw = req.rawBody;
    const addSignalRequest = new AddSignalRequestDTO(raw.toString());
    const addSignalRequestValidation = addSignalRequest.validate();
    if (addSignalRequestValidation.isErr) {
      console.error(
        addSignalRequestValidation.message,
        'AddConnectionController',
      );
      //return response
      //  .status(addSignalRequestValidation.message.status_code)
      //  .json(addSignalRequestValidation.message);
    }
    console.log(addSignalRequest);
    // const result  = await addConnectionUsecase.execute(addConnectionRequestRequest);
    //  return response.status(201).json(result)

    return 'ok';
    const notification: any = {};

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
