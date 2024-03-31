import { NextAuthConfig, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { UserModel } from "@/database/models";

import { AdapterUser } from "next-auth/adapters";
import { IUser } from "@/types/types";

const authOptions: NextAuthConfig = {
  // Set max age to 24 hours
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  session: {},
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // console.log("jwt callback", { token, user, account, profile });

      if (trigger === "update" && session) {
        console.log("Updating session:  ", session);
        return { ...token, user: session.user };
      }

      // Calls when user logged in
      if (user) {
        return { user: user };
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session callback", { session, token });

      // Add user and csrf token to session
      session.user = token.user as AdapterUser & IUser;

      return session;
    },
  },
  providers: [
    CredentialProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await UserModel.findOne({ email });
          if (!user || !user.password) return null;

          const passwordsMatch = await user.comparePassword(password);

          if (passwordsMatch) return user as User;
        }

        return null;
      },
    }),
  ],
};

export default authOptions;
