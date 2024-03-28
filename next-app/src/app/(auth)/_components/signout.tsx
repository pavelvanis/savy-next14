"use client";
import React from "react";
import { Button, Typography } from "@/components/ui";
import { signOut } from "next-auth/react";

const Signout = () => {
  return (
    <div className="text-center">
      <Typography variant="h1">Signout</Typography>
      <Typography variant="lead" className="mt-3">
        You must log out before logging in.
      </Typography>
      <Button
        variant="outlined"
        className="mt-7 hover:bg-blue-gray-50 hover:px-4 transition-all"
        onClick={() => signOut()}
      >
        Signout
      </Button>
    </div>
  );
};

export default Signout;
