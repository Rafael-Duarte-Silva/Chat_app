import { Chat } from 'src/chat/entities/chat.entity';
import { Message } from 'src/message/entities/message.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  password: string;

  @ManyToMany(() => Chat, (chat) => chat.users, { onDelete: 'CASCADE' })
  @JoinTable()
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.users, {
    onDelete: 'CASCADE',
  })
  messages: Message[];
}
