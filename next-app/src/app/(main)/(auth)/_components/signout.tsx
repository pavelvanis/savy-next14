"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button, Typography } from "@/components/ui";

const Signout = () => {
  const [clicked, setClicked] = React.useState(false);

  const handleClick = () => {
    setClicked(true);
    return signOut();
  };
  
  return (
    <div className="text-center">
      <Typography variant="h1">Signout</Typography>
      <Typography variant="lead" className="mt-4 font-light text-lg">
        You must sign out before logging in.
      </Typography>
      <Button
        variant="outlined"
        disabled={clicked}
        className="mt-7 hover:bg-blue-gray-50 hover:px-4 transition-all"
        onClick={handleClick}
      >
        Signout
      </Button>
    </div>
  );
};

export default Signout;
