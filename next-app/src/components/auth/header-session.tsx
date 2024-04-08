import React from "react";
import Link from "next/link";
import { BookOpenTextIcon, KeyRoundIcon, LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { LogoutButton } from "./logout-button";

/**
 * If user is authenticated, show signout button, else show login and register button
 * @param {boolean} state Initializing state of session if authenticated *(true/false)*
 * @returns
 */
const LoginSignout = ({
  state,
  ...props
}: { state: boolean } & PropsWithClassName) => {
  if (state) {
    return <LogOut {...props} />;
  } else return <LoginRegister {...props} />;
};

export default LoginSignout;

const LoginRegister = ({ className }: PropsWithClassName) => (
  <div className={cn("flex gap-x-3", className)}>
    <Button variant="outlined" size="sm" className="btn-hover">
      <Link href="/login" className="flex-center gap-x-2">
        <KeyRoundIcon className="size-4" />
        Log in
      </Link>
    </Button>
    <Button variant="outlined" size="sm" className="btn-hover">
      <Link href="/register" className="flex-center gap-x-2">
        <BookOpenTextIcon className="size-4" />
        Register
      </Link>
    </Button>
  </div>
);

const LogOut = ({ className }: PropsWithClassName) => (
  <LogoutButton>
    <Button
      variant="text"
      size="sm"
      className={cn("flex gap-x-2 items-center btn-hover", className)}
    >
      <LogOutIcon className="size-4" />
    </Button>
  </LogoutButton>
);
