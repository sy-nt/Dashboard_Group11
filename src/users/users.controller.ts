import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import * as v4 from 'uuidv4';
import { GetUser } from './decorator';
import { UsersDto } from './dto/users.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('')
  getProfile(@GetUser() user: UsersDto) {
    return user;
  }
}
