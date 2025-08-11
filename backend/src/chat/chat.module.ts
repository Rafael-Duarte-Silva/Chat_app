import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from 'src/message/message.module';
import { ChatService } from './chat.service';
import { UserModule } from 'src/users/user.module';
import { Chat } from './entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), MessageModule, UserModule],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
