import NextAuth from "next-auth";
import { I_User } from "./user";

declare module "next-auth"{
    interface Session{
        user:I_User
    }
}