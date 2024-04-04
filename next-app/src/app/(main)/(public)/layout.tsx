import React from "react";
import { FooterSmall, HeaderSmall } from "@/components/layout";

const PublicLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="max-w-6xl mx-auto">
      <HeaderSmall />
      <main className=" min-h-screen flex flex-col justify-center items-center">
        {children}
      </main>
      <FooterSmall />
    </div>
  );
};

export default PublicLayout;
