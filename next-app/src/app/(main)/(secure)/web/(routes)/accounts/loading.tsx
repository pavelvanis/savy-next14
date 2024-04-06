import React from "react";
import { PlusIcon, WalletIcon } from "lucide-react";
import { Button, Typography } from "@/components/ui";
import { AccountSkeleton } from "@/components/layout/skeletons";

const LoadingAccountsPage = () => {
  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header ">
        <div className="flex items-center gap-x-4">
          <Typography variant="h2" className="font-bold">
            Accounts
          </Typography>
          <WalletIcon className="size-8" />
        </div>
        <div>
          <Button
            variant="outlined"
            size="sm"
            className="py-1 px-2 sm:py-2 sm:px-4"
            disabled
          >
            <PlusIcon className="size-5" />
            <span className="hidden sm:block">Add Account</span>
          </Button>
        </div>
      </div>
      <section className="page-body list-col">
        <AccountSkeleton />
        <AccountSkeleton />
      </section>
    </div>
  );
};

export default LoadingAccountsPage;
