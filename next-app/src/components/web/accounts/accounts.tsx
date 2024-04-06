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
    <section className={cn("list-col", className)}>
      {/* Accounts */}
      {accounts.length === 0 && (
        <Typography variant="lead" className="font-semibold">
          You don&apos;t have any accounts connected yet
        </Typography>
      )}
      {accounts.map((acc, i) => (
        <AccountCard key={i} {...acc} />
      ))}
    </section>
  );
};

export default AccountsList;
