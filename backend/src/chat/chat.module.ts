import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from 'src/message/message.module';
import { ChatService } from './chat.service';

@Module({
  imports: [MessageModule],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
