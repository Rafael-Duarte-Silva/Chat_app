import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ExtendedError, Server, Socket } from 'socket.io';
import { WsAuthGuard } from '../auth/guards/ws-auth.guard';
import { MessageService } from 'src/message/message.service';
import { CustomSocket, PrivateMessagePayload } from './types';

@WebSocketGateway(3331, {
  namespace: 'chat',
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly messageService: MessageService,
  ) {}

  afterInit(socket: Server) {
    socket.use((client: Socket, next: (err?: ExtendedError) => void) => {
      const wsAuth = new WsAuthGuard(this.jwtService, this.configService);

      wsAuth
        .verify(client)
        .then((userId) => {
          if (!userId) {
            return next(new Error('not authorized'));
          }

          client.data = { id: userId };
          next();
        })
        .catch(() => next(new Error('not authorized')));
    });
  }

  async handleConnection(client: CustomSocket) {
    console.log(`client connected: ${client.data.id}`);
    await client.join(client.data.id);
  }

  handleDisconnect(client: CustomSocket) {
    console.log(`disconnect client: ${client.data.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() payload: PrivateMessagePayload,
    @ConnectedSocket() client: CustomSocket,
  ): Promise<void> {
    console.log(client.data);
    const { to, message } = payload;

    this.server.to(to).emit('message', { from: client.data.id, message });

    await this.messageService.setMessage(message);
  }
}
