import React from "react";
import Image from "next/image";
import { Typography } from "@/components/ui";

const NotFound = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="py-3 fixed top-0">
        <Image
          src="/logo.png"
          width={64}
          height={64}
          alt="logo"
          className=" p-1"
        />
      </header>
      <main className=" min-h-screen flex justify-center items-center">
        <Typography variant="h1" className="font-extrabold">
          You&apos;re next door
        </Typography>
      </main>
    </div>
  );
};

export default NotFound;
