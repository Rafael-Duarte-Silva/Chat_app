import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userAlreadyRegistered = await this.findByUsername(
      createUserDto.username,
    );

    if (userAlreadyRegistered) {
      throw new ConflictException(
        `User '${createUserDto.username}' already registered`,
      );
    }

    const dbUser = {
      ...createUserDto,
      password: hashSync(createUserDto.password, 10),
    };

    await this.userRepository.save(dbUser);
    return { status: 'created' };
  }

  findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }
}
