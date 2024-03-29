"use client";

import React from "react";
import { Button } from "@/components/ui";
import { signOut } from "next-auth/react";

type SignoutProps = React.ComponentProps<typeof Button>;

const Signout = ({ ...props }: SignoutProps) => {
  const [clickable, startTransition] = React.useTransition();
  const handleSignout = () => {
    startTransition(() => {
      signOut();
    });
  };
  return <Button {...props} onClick={handleSignout} disabled={clickable} />;
};

export default Signout;
