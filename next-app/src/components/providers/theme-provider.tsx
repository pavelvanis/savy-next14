"use client";

import React from "react";
import { theme } from "@/config/theme";
import { ThemeProvider as Provider } from "@material-tailwind/react";

const ThemeProvider = ({ children }: { children: any }) => {
  return <Provider value={theme}>{children}</Provider>;
};

export default ThemeProvider;
