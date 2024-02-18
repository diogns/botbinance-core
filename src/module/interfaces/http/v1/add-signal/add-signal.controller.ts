import { Controller, Post, Req, RawBodyRequest, Version } from '@nestjs/common';
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
import { AddSignalCommand } from '@module/application/commands/add-signal';
import { AddSignalResponseDTO } from './dto/add-signal.response';
import { AddSignalRequestDTO } from './dto/add-signal.request';

@ApiTags('Signals')
@Controller('signal')
export class AddSignalController {
  constructor(readonly commandBus: CommandBus) {}

  @Version('1')
  @Post()
  @ApiCreatedResponse({
    description: ResponseDescription.OK,
    type: AddSignalResponseDTO,
  })
  @ApiBadRequestResponse({
    description: ResponseDescription.BAD_REQUEST,
    type: GeneralResponse,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
    type: GeneralResponse,
  })
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

    const query = new AddSignalCommand(
      addSignalRequest.pair,
      addSignalRequest.signal,
      addSignalRequest.value,
    );
    return this.commandBus.execute(query);
  }
}
