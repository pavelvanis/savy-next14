import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

const UserLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);
  //   Redirect to login page if no session exists
  if (!session) return redirect("/login");
  return <>{children}</>;
};

export default UserLayout;
