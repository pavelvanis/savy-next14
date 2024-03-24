import { NextAuthOptions, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // console.log("jwt callback", { token, user, account, profile });
      if (user) {
        return { user: user };
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session callback", { session, token });
      const user = token.user as { name: string };

      return { ...session, user: { ...user } };
    },
  },
  providers: [
    CredentialProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = {
          id: "123",
          name: "John Smith",
          email: "john.smith@example.com",
          user_id: "123",
          user_ID: "123",
        };
        return user;
      },
    }),
  ],
};

export default authOptions;
