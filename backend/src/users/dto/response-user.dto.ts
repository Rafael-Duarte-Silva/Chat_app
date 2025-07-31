import { User } from 'src/users/entities/user.entity';

export class ResponseUserDto {
  id: string;
  username: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
  }
}
