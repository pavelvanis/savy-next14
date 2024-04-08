import React from "react";
import { ArrowLeftRightIcon } from "lucide-react";
import {
  Page,
  PageNavbar,
  PageNavbarProps,
} from "@/components/layout/page-components";
import { TransactionSkeleton } from "@/components/layout/skeletons";

const LoadingTransactionsPage = () => {
  const transactionsNavbarProps: PageNavbarProps = {
    title: {
      children: "Transactions",
      icon: ArrowLeftRightIcon,
    },
    button: false,
  };

  return (
    <Page>
      {/* Header */}
      <PageNavbar {...transactionsNavbarProps} />
      {/* Skeletons of transactions */}
      <div className="page-body list-col">
        <TransactionSkeleton />
        <TransactionSkeleton />
        <TransactionSkeleton />
        <TransactionSkeleton />
        <TransactionSkeleton />
        <TransactionSkeleton />
      </div>
    </Page>
  );
};

export default LoadingTransactionsPage;
