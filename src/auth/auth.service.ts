import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersDto } from 'src/users/dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private config: ConfigService,
  ) {}
  async signup(dto: UsersDto) {
    const hashedPassword = await this.hashPassword(dto.password);
    let newUser = this.usersRepository.create({
      password: hashedPassword,
      firstName: dto.firstName,
      fullName: dto.fullName,
      lastName: dto.lastName,
      username: dto.username,
    });

    try {
      await this.usersRepository.save(newUser);
      const { password, ...resUserData } = newUser;
      return {
        status: true,
        message: 'Sign up successful',
        data: resUserData,
      };
    } catch (err) {
      throw new BadRequestException('Email Already exists!');
    }
  }
  async signin(dto: AuthDto, req: Request, res: Response) {
    const { username, password } = dto;
    const user = await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new UnauthorizedException(
        'Your account and/or password is incorrect, please try again',
      );
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException(
        'Your account and/or password is incorrect, please try again',
      );
    }
    const token = await this.signToken(user.user_id, user.username);
    if (!token) {
      throw new ForbiddenException();
    }
    res.cookie('token', token, { httpOnly: true, secure: true });
    delete user.password;
    return res.send({ status: true, ...user, token: token });
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');
    // Do something to invalidate the access token
    return { message: 'Signed out successfully' };
  }
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  async signToken(user_id: string, username: string) {
    return this.jwt.signAsync(
      { user_id: user_id, username: username },
      { secret: this.config.get('JWT_SECRET'), expiresIn: '1day' },
    );
  }
}
