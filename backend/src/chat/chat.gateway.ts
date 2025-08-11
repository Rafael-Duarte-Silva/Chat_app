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
import { CustomSocket } from './types';
import { MessageDto } from '../message/dto/message.dto';
import { FindUserDto } from 'src/users/dto/find-user.dto';
import { ChatService } from './chat.service';
import { LoadMessageDto } from '../message/dto/load-message.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { LoadChatDto } from './dto/load-chat.dto';
import { UserService } from 'src/users/user.service';

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
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  afterInit(socket: Server) {
    socket.use((client: Socket, next: (err?: ExtendedError) => void) => {
      const wsAuth = new WsAuthGuard(this.jwtService, this.configService);

      wsAuth
        .verify(client)
        .then((payload) => {
          if (!payload) {
            return next(new Error('not authorized'));
          }

          client.data = payload;
          next();
        })
        .catch(() => next(new Error('not authorized')));
    });
  }

  async handleConnection(client: CustomSocket) {
    console.log(`client connected: ${client.data.id} ${client.data.username}`);
    await client.join(client.data.id);
  }

  handleDisconnect(client: CustomSocket) {
    console.log(`disconnect client: ${client.data.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() payload: MessageDto,
    @ConnectedSocket() client: CustomSocket,
  ): Promise<void> {
    console.log(client.data, payload);
    const { to, message, chatId } = payload;

    await this.messageService.setMessage(message, client.data.id, chatId);

    this.server.to(to).emit('message', {
      from: client.data.id,
      to,
      username: client.data.username,
      message,
    });
    this.server.to(client.id).emit('message', {
      from: client.data.id,
      to: client.data.id,
      username: client.data.username,
      message,
    });
  }

  @SubscribeMessage('loadChat')
  async handleLoadChat(
    @MessageBody() payload: LoadChatDto,
    @ConnectedSocket() client: CustomSocket,
  ): Promise<void> {
    const { to } = payload;

    const chatId = await this.chatService.create(client.data.id, to);

    client.emit('loadChat', { chatId });
  }

  @SubscribeMessage('loadMessage')
  async handleLoadMessage(
    @MessageBody() payload: LoadMessageDto,
    @ConnectedSocket() client: CustomSocket,
  ): Promise<void> {
    const { chatId } = payload;

    const messages = await this.messageService.loadMessage(
      chatId,
      client.data.id,
    );

    client.emit('loadMessage', messages);
  }

  @SubscribeMessage('getUsers')
  async handleUsers(
    @MessageBody() payload: FindUserDto,
    @ConnectedSocket() client: CustomSocket,
  ): Promise<void> {
    const chats: ResponseUserDto[] = await this.userService.findAll(
      payload,
      client.data.id,
    );

    client.emit('getUsers', chats);
  }
}
