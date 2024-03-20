"use client";
import { SessionProvider as Provider } from "next-auth/react";
import React from "react";

const SessionProvider = ({ children }: React.PropsWithChildren) => {
  return <Provider>{children}</Provider>;
};

export default SessionProvider;
