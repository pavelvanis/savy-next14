// import NextAuth, { type DefaultSession } from "next-auth";
import { IUser } from "@/types/types";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}