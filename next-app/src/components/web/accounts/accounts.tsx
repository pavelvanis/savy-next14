import React from "react";
import AccountCard from "./account-card";
import { Typography } from "@/components/ui";
import { TinkAccounts } from "@/types/types";

type AccountsListProps = TinkAccounts & {};

const AccountsList: React.FC<AccountsListProps> = async ({ accounts }) => {
  return (
    <div className="flex flex-col gap-y-6 h-full w-full mt-3">
      {/* Accounts */}
      {accounts.length === 0 && (
        <Typography variant="lead" className="font-semibold">
          No accounts found
        </Typography>
      )}
      {accounts.map((acc, i) => (
        <AccountCard key={i} {...acc} />
      ))}
    </div>
  );
};

export default AccountsList;
