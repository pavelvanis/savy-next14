import React from "react";
import { SecureFooter, SecureHeader } from "./_components";

const SecureLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <SecureHeader />
      {children}
      <SecureFooter />
    </>
  );
};

export default SecureLayout;
