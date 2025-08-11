import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync } from 'bcrypt';
import { ResponseUserDto } from './dto/response-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
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

    return this.userRepository.save(dbUser);
  }

  findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async findAll({ page, search }: FindUserDto, id: string) {
    const take: number = 8;
    const [users] = await this.userRepository.findAndCount({
      order: { username: 'ASC' },
      where: {
        username: Raw((alias) => `LOWER(${alias}) LIKE LOWER('%${search}%')`),
      },
      skip: (page - 1) * take,
      take,
    });
    if (users === null) {
      return [];
    }

    return users
      .map((user) => this.response(user))
      .filter((user) => id !== user.id);
  }

  async isReal(userId: string) {
    const user = await this.userRepository.findBy({ id: userId });

    return !!user;
  }

  private response(user: User) {
    return new ResponseUserDto(user);
  }
}
