"use client";

import React from "react";
import Link from "next/link";
import { KeyRoundIcon, LogOutIcon, UsersRoundIcon } from "lucide-react";
import Signout from "@/components/auth/signout";
import { Button } from "@/components/ui";
import { useSession } from "next-auth/react";

/**
 * If user is authenticated, show signout button, else show login and register button
 * @param {boolean} state Initializing state of session if authenticated *(true/false)*
 * @returns
 */
const LoginSignout = ({ state }: { state: boolean }) => {
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
    return <LogOut />;
  } else return <LoginRegister />;
};

export default LoginSignout;

const LoginRegister = () => (
  <div className="flex gap-x-3">
    <Button
      variant="outlined"
      size="sm"
      className="flex gap-x-2 items-center hover:bg-gray-100 transition-all"
    >
      <KeyRoundIcon className="w-4 h-4" />
      <Link href="/login">Log in</Link>
    </Button>
    <Button
      variant="outlined"
      size="sm"
      className="flex gap-x-2 items-center hover:bg-gray-100 transition-all"
    >
      <UsersRoundIcon className="w-4 h-4" />
      <Link href="/register">Register</Link>
    </Button>
  </div>
);

const LogOut = () => (
  <Signout
    variant="outlined"
    size="sm"
    className="flex gap-x-2 items-center hover:bg-gray-100 transition-all"
  >
    <LogOutIcon className="w-4 h-4" />
  </Signout>
);
