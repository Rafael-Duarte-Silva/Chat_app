import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async setMessage(
    text: string = '',
    userId: string,
    chatId: string,
  ): Promise<void> {
    const message = this.messageRepository.create({
      text,
      users: { id: userId },
      chats: { id: chatId },
    });

    await this.messageRepository.save(message);
    return;
  }

  async isBelong(userId: string) {
    const user = await this.messageRepository
      .createQueryBuilder('message')
      .innerJoinAndSelect('message.chats', 'chat')
      .innerJoinAndSelect('chat.users', 'user')
      .where('user.id = :userId', { userId })
      .getOne();

    return !!user;
  }

  async loadMessage(chatId: string, userId: string) {
    const isBelong = await this.isBelong(userId);
    if (!isBelong) {
      return [];
    }

    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .innerJoinAndSelect('message.users', 'user')
      .where('message.chatsId = :chatId', { chatId })
      .orderBy('message.dateCreated', 'ASC')
      .limit(10)
      .getMany();

    console.log(messages);

    if (!messages) {
      return [];
    }

    return messages.map((message) => this.response(message, userId));
  }

  response(message: Message, userId: string) {
    return {
      from: message.users.id,
      to: userId,
      message: message.text,
      username: message.users.username,
    };
  }
}
