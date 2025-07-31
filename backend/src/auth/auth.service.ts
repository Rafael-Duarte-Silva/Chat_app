import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly expiresIn: number;
  private readonly isSecure: boolean;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.expiresIn = parseInt(
      this.configService.get<string>('JWT_EXPIRATION_TIME') || '0',
    );
    this.isSecure = this.configService.get<string>('NODE_ENV') === 'production';
  }

  async login(
    { username, password }: LoginUserDto,
    response: Response,
  ): Promise<void> {
    const foundUser = await this.userService.findByUsername(username);

    if (!foundUser || !compareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, username: foundUser.username };
    const token = this.jwtService.sign(payload);

    response.cookie('jwt', token, {
      httpOnly: true,
      secure: this.isSecure,
      sameSite: 'lax',
      maxAge: this.expiresIn * 1000,
    });
  }

  register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
