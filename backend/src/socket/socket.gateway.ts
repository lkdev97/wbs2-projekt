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
    if (client.id !== data.senderClientId) {
      this.server.emit('statusChange', data);
    }
  }
}
