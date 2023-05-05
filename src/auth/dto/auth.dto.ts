import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";




export class AuthDto {
    @IsEmail()
    @Expose()
    username: string;
    @Expose()
    @IsNotEmpty()
    password: string;
}