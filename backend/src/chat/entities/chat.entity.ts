import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @ManyToMany(() => User, (user) => user.chats, { onDelete: 'CASCADE' })
  users: User[];

  @OneToMany(() => Message, (message) => message.chats, {
    onDelete: 'CASCADE',
  })
  messages: Message[];
}
