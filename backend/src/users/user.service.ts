import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync } from 'bcrypt';
import { FindUserDto } from './dto/find-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { CustomRequest } from '../common/types';

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

    await this.userRepository.save(dbUser);
    return { status: 'created' };
  }

  findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async findAll({ page, search }: FindUserDto, request: CustomRequest) {
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
      return;
    }

    return users
      .map((user) => this.response(user))
      .filter((user) => request.user.sub !== user.id);
  }

  private response(user: User) {
    return new ResponseUserDto(user);
  }
}
