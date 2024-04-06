"use client";

import React from "react";
import Link from "next/link";
import { KeyRoundIcon, LogOutIcon, UsersRoundIcon } from "lucide-react";
import Signout from "@/components/auth/signout";
import { Button } from "@/components/ui";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

/**
 * If user is authenticated, show signout button, else show login and register button
 * @param {boolean} state Initializing state of session if authenticated *(true/false)*
 * @returns
 */
const LoginSignout = ({
  state,
  ...props
}: { state: boolean } & PropsWithClassName) => {
  const session = useSession();
  const [login, setLogin] = React.useState<boolean>(state);

  React.useEffect(() => {
    if (session.status === "authenticated") {
      setLogin(true);
    } else if (session.status !== "loading") {
      setLogin(false);
    }
  }, [session.status]);

  if (login) {
    return <LogOut {...props} />;
  } else return <LoginRegister {...props} />;
};

export default LoginSignout;

const LoginRegister = ({ className }: PropsWithClassName) => (
  <div className={cn("flex gap-x-3", className)}>
    <Button variant="outlined" size="sm" className="flex gap-x-2 items-center">
      <KeyRoundIcon className="w-4 h-4" />
      <Link href="/login">Log in</Link>
    </Button>
    <Button variant="outlined" size="sm" className="flex gap-x-2 items-center">
      <UsersRoundIcon className="w-4 h-4" />
      <Link href="/register">Register</Link>
    </Button>
  </div>
);

const LogOut = ({ className }: PropsWithClassName) => (
  <Signout
    variant="text"
    size="sm"
    className={cn("flex gap-x-2 items-center", className)}
  >
    <LogOutIcon className="w-4 h-4" />
  </Signout>
);
