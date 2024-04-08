import { NextAuthConfig, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { UserModel } from "@/database/models";
import { IUser } from "@/types/types";
import email from "next-auth/providers/email";

export const authOptions = {
  // Set max age to 24 hours
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  session: { strategy: "jwt" },
  // Set pages
  pages: { signIn: "/login" },
  callbacks: {
    // Return a user if sign in
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            permanentUserId: user.permanentUserId,
          },
        };
      }
      return { ...token };
    },
    // Return user to session
    async session({ session, token }) {

      session.user = token.user as IUser;

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
} satisfies NextAuthConfig;
