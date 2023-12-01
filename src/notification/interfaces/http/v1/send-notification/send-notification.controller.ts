/**
import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationGateway } from '../../../../infrastucture/nestjs/notification.gateway';

@Controller()
export class SendNotificationController {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  @Get()
  getHello(): string {
    return 'Hello, Nest.js!';
  }

  @Post('send')
  sendMessage(@Body() message: { username: string; message: string }): string {
    // Send the message to WebSocket clients
    console.log(message);

    this.notificationGateway.handleMessage(null, message);
    return 'Message sent to WebSocket clients';
  }
}
**/
