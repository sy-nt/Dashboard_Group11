import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosClient from "@/api-client/axiosClient";
import { I_User } from "@/models";
export const AuthOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId:'222479981202-4kjog3g6gah4tlf5o56kli1k8hd8tqu8.apps.googleusercontent.com',
    //   clientSecret:'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',
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = credentials;
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          try {
            const userData = await axiosClient.post<{}, I_User>(
              "/auth/signin",
              { password: user.password, username: user.username }
            );

            // Set the JWT token as a cookie
            return { ...userData, id: userData.user_id };
          } catch (error:any) {
            throw new Error(error.message);
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token as I_User | any;
      return session;
    },

  },

  pages: {
    signIn: "/login",
    error: "/login",
    signOut:"/login",
  },
};
