import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return this.authService.login(body, response);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.register(createUserDto);
  }
}
