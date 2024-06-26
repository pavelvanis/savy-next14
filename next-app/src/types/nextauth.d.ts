import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";
import { IUser } from "./types";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }

  interface User extends IUser {}
}