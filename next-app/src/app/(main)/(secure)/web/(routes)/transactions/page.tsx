import React from "react";
import { ArrowLeftRightIcon } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { getTransactions } from "@/actions/server/data";
import TransactionList from "@/components/web/transactions/transactions";
import {
  Page,
  PageContentError,
  PageNavbar,
  PageNavbarProps,
} from "@/components/layout/page-components";

/**
 * Page to show all transaction history
 */
const TransactionsPage = async () => {
  const { user } = await getAuthSession();
  const transactions = await getTransactions(user.permanentUserId);

  const transactionsNavbarProps: PageNavbarProps = {
    title: {
      children: "Transactions",
      icon: ArrowLeftRightIcon,
    },
    button: false,
  };

  return (
    <Page>
      {/* Transactions header */}
      <PageNavbar {...transactionsNavbarProps} />
      {/* Content */}
      {transactions.data ? (
        <TransactionList className="page-body" {...transactions.data} />
      ) : (
        <PageContentError message={transactions.error.message} />
      )}
    </Page>
  );
};

export default TransactionsPage;
