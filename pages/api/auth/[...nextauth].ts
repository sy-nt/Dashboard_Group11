import { AuthOptions } from "@/lib/auth"
import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth(AuthOptions)