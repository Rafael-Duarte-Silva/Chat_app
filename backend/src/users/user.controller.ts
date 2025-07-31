import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { FindUserDto } from './dto/find-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CustomRequest } from '../common/types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query() query: FindUserDto, @Req() request: CustomRequest) {
    return this.userService.findAll(query, request);
  }
}
