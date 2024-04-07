import React from "react";
import { ArrowLeftRightIcon } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { Typography } from "@/components/ui";
import { getTransactions } from "@/actions/server/data";
import TransactionList from "@/components/web/transactions/transactions";

/**
 * Page to show all transaction history
 */
const TransactionsPage = async () => {
  const { user } = await getAuthSession();
  const transactions = await getTransactions(user.permanentUserId);
  console.log(
    "Transactions: ",
    JSON.stringify(transactions.data?.transactions, null, 2)
  );
  return (
    <div className="page-container">
      {/* Page header */}
      <div className="page-header">
        <div className="flex items-center gap-x-4">
          <Typography variant="h2" className="font-bold">
            Transactions
          </Typography>
          <ArrowLeftRightIcon className="size-8" />
        </div>
      </div>
      {/* List of transactions */}
      {transactions.data ? (
        <TransactionList className="page-body" {...transactions.data} />
      ) : (
        <Typography variant="lead" className="font-semibold">
          {transactions.error.message}
        </Typography>
      )}
    </div>
  );
};

export default TransactionsPage;
