import { DefaultSession } from "next-auth";
import { IUser } from "@/types/types";

declare module "next-auth" {
  interface Session {
    user: User;
    csrfToken: string;
  }
}

export interface User extends IUser {}
