import React from "react";
import AccountCard from "./account-card";
import { Typography } from "@/components/ui";
import { TinkAccounts } from "@/types/types";
import { cn } from "@/lib/utils";

type AccountsListProps = TinkAccounts & PropsWithClassName & {};

const AccountsList: React.FC<AccountsListProps> = async ({
  className,
  accounts,
}) => {
  return (
    <div className={cn("list-col", className)}>
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
