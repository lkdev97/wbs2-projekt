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
    // Überprüfe, ob der Absender der Nachricht nicht der gleiche ist wie der empfangende Client
    if (client.id !== data.senderClientId) {
      this.server.emit('statusChange', data);
    }
  }

  /*@SubscribeMessage('friendRequestSent')
  handleFriendRequestSent(payload: { senderId: string; recipientId: string }) {
    this.server.emit('friendRequestSent', payload);
  }*/

  /*@SubscribeMessage('friendshipStatusUpdated')
  handleFriendshipStatusUpdated(payload: { userId: string; friendStatus: string }) {
    this.server.emit('friendshipStatusUpdated', payload);
  }*/
}
