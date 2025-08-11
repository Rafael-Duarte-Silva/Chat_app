import { User } from 'src/users/entities/user.entity';

export class ResponseUserDto {
  id: string;
  name: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.username;
  }
}
