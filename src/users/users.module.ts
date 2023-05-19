import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { JwtStrategy } from '@/auth/strategy/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, AuthService, JwtService]
})
export class UsersModule {}
