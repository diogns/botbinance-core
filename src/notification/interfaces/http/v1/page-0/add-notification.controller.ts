import { Body, Controller, Post, Get, Req, Version } from '@nestjs/common';

import { CommandBus } from '@nestjs/cqrs';
import {
  ApiTags,
} from '@nestjs/swagger';


@ApiTags('Notifications')
@Controller('')
export class TestController {
  constructor(readonly commandBus: CommandBus) {}

  @Get()
  @Post()
  //async addNotifications(@Body() body: any, @Req() req: any) {
  async addUser(@Body() body: any, @Req() req: any) {
    console.log('here!')


    return 'ok';
  }
}
