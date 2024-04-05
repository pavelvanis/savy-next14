import React from "react";
import { WalletIcon } from "lucide-react";
import { Typography } from "@/components/ui";
import { TransactionSkeleton } from "@/components/layout/skeletons";

const LoadingTransactionsPage = () => {
  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header ">
        <div className="flex items-center gap-x-4">
          <Typography variant="h2" className="font-bold">
            Transaction
          </Typography>
          <WalletIcon className="size-8" />
        </div>
      </div>
      <div className="page-body list-col">
        <TransactionSkeleton />
        <TransactionSkeleton />
        <TransactionSkeleton />
        <TransactionSkeleton />
      </div>
    </div>
  );
};

export default LoadingTransactionsPage;
