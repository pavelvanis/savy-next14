import React from "react";
import { ArrowLeftRightIcon } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { getTransactions } from "@/actions/server/data";
import TransactionList from "@/components/web/transactions/transactions";
import {
  Page,
  PageBody,
  PageContentError,
  PageNavbar,
  PageNavbarProps,
} from "@/components/layout/page-components";
import { groupByMonth } from "@/lib/utils";

// Props for the transactions page navbar
const transactionsNavbarProps: PageNavbarProps = {
  title: {
    children: "Transactions",
    icon: ArrowLeftRightIcon,
  },
  button: false,
};

/**
 * Page to show all transaction history
 */
const TransactionsPage = async () => {
  const { user } = await getAuthSession();
  const transactions = await getTransactions(user.permanentUserId);

  const transactionsByMonth = groupByMonth(
    transactions.data?.transactions || []
  );

  return (
    <Page>
      {/* Transactions header */}
      <PageNavbar {...transactionsNavbarProps} />
      {/* Transactions list | Error message */}
      <PageBody className="list-col">
        {transactions.data ? (
          Object.entries(transactionsByMonth).map(
            ([date, filteredTransactions]) => (
              <TransactionList {...transactions.data} date={date} />
            )
          )
        ) : (
          <PageContentError message={transactions.error.message} />
        )}
      </PageBody>
    </Page>
  );
};

export default TransactionsPage;
