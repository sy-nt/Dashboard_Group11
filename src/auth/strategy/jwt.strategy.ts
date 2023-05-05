import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '@/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(private config: ConfigService, @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>) {
     super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  // private static extractJWT(req: Request): string | null {
  //   console.log(req.headers)
  //   if (req.headers && 'token' in req.headers) {
  //     return req.cookies.token;
  //   }
  //   return null;
  // }

  async validate(payload: { id: string; username: string }) {
    const checkUser = this.userRepository.findOne({
      where:{
        username : payload.username
      }
    })
    delete (await checkUser).password
    return checkUser;
  }
}
 