import React from "react";
import { cn } from "@/lib/utils";
import AccountCard from "./account-card";
import { Typography } from "@/components/ui";
import { TinkAccount, TinkAccounts } from "@/types/types";
import { FilterSortTable } from "@/components/sort-table";
import { ColumnDef } from "@tanstack/react-table";

type AccountsListProps = TinkAccounts & PropsWithClassName & {};

const accountColumns: ColumnDef<TinkAccount>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "currencyCode",
    header: "Currency",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "accountNumber",
    header: "Account number",
  },
  {
    accessorKey: "credentialsId",
    header: "Credentials id",
  },
  {
    accessorKey: "userId",
    header: "User id",
  },
  {
    accessorKey: "updated",
    header: "Updated",
  },
];

const AccountsList: React.FC<AccountsListProps> = async ({
  className,
  accounts,
}) => {
  console.log(accounts[0]);
  return (
    <section className={cn("list-col", className)}>
      {/* No accounts */}
      {accounts.length === 0 && (
        <Typography variant="lead" className="font-semibold text-lg">
          You don&apos;t have any accounts connected yet
        </Typography>
      )}
      {/* Table of accounts */}
      <FilterSortTable
        Component={AccountCard}
        columns={accountColumns}
        data={accounts}
      />
    </section>
  );
};

export default AccountsList;
