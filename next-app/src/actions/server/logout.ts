"use server";

import { signOut } from "@/lib/auth";

export const logout = async () => {
  console.log("logout...");
  await signOut();
};
