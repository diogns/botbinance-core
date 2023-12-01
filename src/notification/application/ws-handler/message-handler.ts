import { Injectable, Inject, InternalServerErrorException, Logger } from '@nestjs/common';

import { Server, Socket } from 'socket.io';
import { NotificationGateway } from '@notification/interfaces/ws/v1/notification.gateway';

@Injectable()
export class MessageService {
  constructor(
    private readonly logger: Logger
  ) {}

  handleMessage(payload: { room: string; notification: any }, server: Server) {
    const { room, notification } = payload;
    //
    server.to(`room_${room}`).emit('new_message', notification);
  }
}
