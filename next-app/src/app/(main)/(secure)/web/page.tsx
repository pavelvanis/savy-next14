import React from "react";
import Image from "next/image";
import { getAuthSession } from "@/lib/auth";
import { Typography } from "@/components/ui";
import { Page } from "@/components/layout/page-components";
import { AccountsOverview } from "@/components/web/overviews";
import TransactionsOverview from "@/components/web/overviews/overviews-transactions";

const WebPage = async () => {
  const { user } = await getAuthSession();

  return (
    <Page>
      <div className="flex gap-4 flex-col">
        <div className="mb-4">
          <Typography variant="h3" className="font-bold text-center">
            <span className="font-medium text-xl ">Welcome</span>{" "}
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="lead" className=" text-base mt-3 text-center">
            Here are some overviews of your accounts and transactions.
          </Typography>
        </div>
        <AccountsOverview user={user} />
        <div className="grid  sm:grid-cols-2">
          <TransactionsOverview user={user} />
          <div className="flex-center">
            <Image
              alt="Personal finance"
              src="/statistics_01.svg"
              width={500}
              height={500}
              className=" object-cover h-60 w-60"
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default WebPage;
