import React from "react";
import { getTransactions } from "@/actions/server/data";
import { Card, Typography } from "@/components/ui";
import { IUser, TinkTransaction } from "@/types/types";
import { BalanceText } from "../balance";
import { getAmount } from "@/lib/utils";
import NoDataBox from "../no-data";

interface TransactionsOverviewProps {
  user: IUser;
}

const TransactionsOverview: React.FC<TransactionsOverviewProps> = async ({
  user,
}) => {
  const transactionsReasponse = await getTransactions(user.permanentUserId);

  const transactions = transactionsReasponse.data?.transactions;

  if (transactions) {
    return (
      <section className="relative p-4 flex flex-col w-full h-min gap-y-3">
        <Typography variant="h5" className="font-bold text-black text-center">
          Last 10 transactions
        </Typography>
        {transactions.length === 0 && (
          <NoDataBox>No transactions to show</NoDataBox>
        )}
        <div className="absolute rounded-lg top-0 left-0 h-full w-full bg-gradient-to-r from-gray-500/10 via-gray-100/30 to-gray-500/10 -z-10" />
        <div className="inline-flex flex-1 flex-col gap-y-1 items-center overflow-x-auto snap-x overscroll-auto no-scrollbar">
          {transactions.slice(0, 10).map((tran, i) => {
            return <TransactionOverviewCard key={i} {...tran} />;
          })}
        </div>
      </section>
    );
  }
};

export default TransactionsOverview;

interface TransactionOverviewCardProps extends TinkTransaction {}

const TransactionOverviewCard: React.FC<TransactionOverviewCardProps> = ({
  dates,
  descriptions,
  amount: { value, currencyCode },
}) => {
  return (
    <Card className="snap-start scroll-ml-1 p-3 py-2 w-full grid grid-cols-2 mobile:grid-cols-3">
      <Typography
        variant="h6"
        className="font-bold text-gray-900 uppercase whitespace-nowrap"
      >
        {new Date(dates.booked).toLocaleString("cs-CZ", { dateStyle: "long" })}
      </Typography>
      <Typography
        variant="h6"
        className="font-medium text-center whitespace-nowrap truncate "
      >
        {descriptions.display}
      </Typography>
      <BalanceText
        className="ms-auto font-bold col-span-2 mobile:col-span-1 "
        amount={getAmount(value.scale, value.unscaledValue)}
        currencyCode={currencyCode}
      />
    </Card>
  );
};
