import React from "react";
import "@/styles/globals.css";

interface TestWrapperProps extends React.PropsWithChildren {}

export const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
  return <div className="p-5">{children}</div>;
};
