import React from "react";
import { FooterSmall, HeaderSmall } from "@/components/layout";

const PublicLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <HeaderSmall />
      <main className=" container min-h-screen flex flex-col justify-start items-center">
        {children}
      </main>
      <FooterSmall />
    </>
  );
};

export default PublicLayout;
