import { IsEmail, IsNotEmpty, IsString, isString } from 'class-validator';
import { Expose, Transform } from "class-transformer";



export class UsersDto{
    user_id: string;

    @Expose()
    @IsNotEmpty()
    firstName:string;

    @Expose()
    @IsNotEmpty()
    lastName:string;

    
    
    @Expose()
    @IsEmail()
    username:string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    password:string;
    @Transform(({obj})=>obj.firstName + " "  + obj.lastName)
    @Expose()
    fullName
    
}