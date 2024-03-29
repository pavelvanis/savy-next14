"use client";

import React, { PropsWithChildren } from "react";
import { ThemeProvider as Provider } from "@material-tailwind/react";
import { theme } from "@/config/theme";

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <Provider value={theme}>{children}</Provider>;
};

export default ThemeProvider;
