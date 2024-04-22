import React from "react";
import { BookOpenTextIcon, KeyRoundIcon, LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, LinkButton } from "@/components/ui";
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
    <LinkButton href="/login">
      <KeyRoundIcon className="size-4" />
      Log in
    </LinkButton>
    <LinkButton href="/login">
      <BookOpenTextIcon className="size-4" />
      Register
    </LinkButton>
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
