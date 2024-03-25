import { getServerSession, NextAuthOptions, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { LocalApiAxios } from "./axios";

const authOptions: NextAuthOptions = {
  // Setup max age to 24 hours
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // console.log("jwt callback", { token, user, account, profile });

      console.log("JWT was called...");

      // Calls when user logged in
      if (user) {
        const csrf = await getCsrfToken();
        return { user: user, csrfToken: csrf };
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session callback", { session, token });

      console.log("Session was called...");

      // Add user and csrf token to session
      const user = token.user as User;
      const csrf = token.csrfToken as string;

      return { ...session, user: { ...user }, csrfToken: csrf };
    },
  },
  providers: [
    CredentialProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log(credentials);
        const login = await LocalApiAxios.post("/auth/login", credentials);

        if (!login) {
          return null;
        }

        const user = login.data as User;

        return user;
      },
    }),
  ],
};

export default authOptions;
