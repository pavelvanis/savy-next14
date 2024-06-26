"use client";

import React from "react";
import { logout } from "@/actions/server/logout";

type LogoutButtonProps = React.PropsWithChildren & {};

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
