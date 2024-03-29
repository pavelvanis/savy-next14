import React from "react";
import { PublicHeader, PublicFooter } from "./_components";

const PublicLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="max-w-6xl mx-auto">
      <PublicHeader />
      <main className=" min-h-screen flex flex-col justify-center items-center">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
