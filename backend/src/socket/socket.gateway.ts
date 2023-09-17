import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('statusChange')
  handleStatusChange(client: Socket, data: any) {
    this.server.emit('statusChange', data);
  }

  @SubscribeMessage('friendRequestSent')
  handleFriendRequestSent(payload: { senderId: string, recipientId: string }) {
    this.server.emit('friendRequestSent', payload);
  }

  @SubscribeMessage('friendshipStatusUpdated')
  handleFriendshipStatusUpdated(payload: { userId: string, friendStatus: string }) {
    this.server.emit('friendshipStatusUpdated', payload);
  }

}
 