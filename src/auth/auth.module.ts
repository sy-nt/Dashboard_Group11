import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersEntity } from 'src/users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports:[TypeOrmModule.forFeature([UsersEntity]), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UsersEntity, JwtStrategy, JwtService]
})
export class AuthModule {}
