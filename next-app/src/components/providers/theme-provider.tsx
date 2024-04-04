"use client";

import React from "react";
import { theme } from "@/config/theme";
import { ThemeProvider as Provider } from "@material-tailwind/react";

const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  return <Provider value={theme}>{children}</Provider>;
};

export default ThemeProvider;
