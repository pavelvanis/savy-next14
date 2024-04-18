import React from "react";
import { getAuthSession } from "@/lib/auth";
import { Typography } from "@/components/ui";
import { Page } from "@/components/layout/page-components";
import { AccountsOverview } from "@/components/web/overviews";
import TransactionsOverview from "@/components/web/overviews/overviews-transactions";
import { TransactionsBalancesChart } from "@/components/web/transactions/transactins-chart";
import { getTransactions } from "@/actions/server/data";

const WebPage = async () => {
  const { user } = await getAuthSession();

  const transactinsResponse = await getTransactions(user.permanentUserId);

  const transactions = transactinsResponse.data?.transactions;

  return (
    <Page>
      <div className="flex gap-5 flex-col">
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
        <div className="grid  md:grid-cols-2">
          <TransactionsOverview user={user} />
          <div className="flex-center">
            {transactions && (
              <TransactionsBalancesChart transactions={transactions} />
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default WebPage;
