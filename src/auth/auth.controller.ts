import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UsersDto } from 'src/users/dto/users.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){

    }
    @Post('signup')
    signup(@Body() data:UsersDto){
        return this.authService.signup(data)
    }
    @Post('signin')
    signin(@Body() data:AuthDto, @Request() req, @Response() res){
        return this.authService.signin(data, req, res)
    }
    @Get('signout')
    signout(@Request() req, @Response() res){
        return this.authService.signout(req, res)
    }
    
}
