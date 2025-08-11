import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/users/user.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    private readonly userService: UserService,
  ) {}

  async create(fromId: string, toId: string) {
    if (
      !(await this.userService.isReal(fromId)) &&
      !(await this.userService.isReal(toId))
    ) {
      return;
    }

    const chatAlreadyRegistered = await this.chatRepository
      .createQueryBuilder('chat')
      .innerJoin('chat.users', 'user1')
      .innerJoin('chat.users', 'user2')
      .where('user1.id = :fromId', { fromId })
      .andWhere('user2.id = :toId', { toId })
      .getOne();

    if (chatAlreadyRegistered) {
      return chatAlreadyRegistered.id;
    }

    const chat = this.chatRepository.create({
      users: [{ id: fromId }, { id: toId }],
    });
    return (await this.chatRepository.save(chat)).id;
  }
}
