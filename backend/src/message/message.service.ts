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
    const userBelong: boolean = await this.messageRepository
      .createQueryBuilder('message')
      .innerJoinAndSelect('message.chats', 'chat')
      .innerJoinAndSelect('chat.users', 'user')
      .where('user.id = :userId', { userId })
      .getExists();

    return userBelong;
  }

  async loadMessage(chatId: string, userId: string) {
    const isBelong = await this.isBelong(userId);
    if (!isBelong) {
      return [];
    }

    const messages: { message: string; from: string; username: string }[] =
      await this.messageRepository
        .createQueryBuilder('message')
        .innerJoinAndSelect('message.users', 'user')
        .select([
          'message.text AS message',
          'user.id AS from',
          'user.username AS username',
        ])
        .where('message.chatsId = :chatId', { chatId })
        .orderBy('message.dateCreated', 'DESC')
        .limit(10)
        .getRawMany();

    if (!messages) {
      return [];
    }

    const reverseMessages = messages.map((message) =>
      this.response(message, userId),
    );

    let right: number = reverseMessages.length - 1;
    let left: number = 0;
    while (left < right) {
      const swap = reverseMessages[left];
      reverseMessages[left] = reverseMessages[right];
      reverseMessages[right] = swap;

      right--;
      left++;
    }

    return reverseMessages;
  }

  response(
    message: { message: string; from: string; username: string },
    userId: string,
  ) {
    return {
      ...message,
      to: userId,
    };
  }
}
