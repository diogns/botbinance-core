import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '@notification/application/ws-handler/message-handler';

@WebSocketGateway(3500, {
  cors: { origin: '*' },
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    // private socketService: SocketService,
    private readonly messageService: MessageService,
    private readonly logger: Logger,
  ) {}

  @WebSocketServer() public server: Server;

  afterInit() {
    this.logger.log('Initialized WS Server.....');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('event_join')
  handleJoinRoom(client: Socket, room: string) {
    client.join(`room_${room}`);
  }

  @SubscribeMessage('event_message')
  handleIncommingMessage(payload: {
    user: string;
    user_group: string;
    notification: any;
  }) {
    console.log(payload);
    //this.messageService.handleMessage(payload, this.server);
  }

  @SubscribeMessage('event_leave')
  handleRoomLeave(client: Socket, room: string) {
    client.leave(`room_${room}`);
  }
}
