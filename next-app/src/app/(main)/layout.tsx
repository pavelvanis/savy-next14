import React, { PropsWithChildren } from "react";
import MainHeader from "./_components/header";
import MainFooter from "./_components/footer";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <MainHeader className="" />
      <main className="">{children}</main>
      <MainFooter className="" />
    </>
  );
};

export default MainLayout;
