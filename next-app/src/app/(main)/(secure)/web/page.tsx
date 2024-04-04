import React from "react";
import { getAuthSession } from "@/lib/auth";
import { Typography } from "@/components/ui";

const WebPage = async () => {
  const { user } = await getAuthSession();

  return (
    <div>
      <Typography variant="h3" className="font-bold text-center">
        <span className="font-medium text-xl ">Welcome</span> {user.firstName}{" "}
        {user.lastName}
      </Typography>
      <Typography variant="lead" className=" text-base mt-3 text-center">
        Here will be some overviews of your accounts and transactions.
      </Typography>
    </div>
  );
};

export default WebPage;
