"use client";
import React from "react";
import { cn, getAmount } from "@/lib/utils";
import AccountCard from "./account-card";
import { Typography } from "@/components/ui";
import { TinkAccount, TinkAccounts } from "@/types/types";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ReactTable,
  ReactTableBody,
  ReactTablePagination,
} from "@/components/react-table";
import SortableAccountsHeader from "./accounts-sortable";

type AccountsListProps = TinkAccounts & PropsWithClassName & {};

const accountColumns: ColumnDef<TinkAccount>[] = [
  {
    // accessorKey: "id",
    header: "Id",
    id: "id",
    accessorFn: (data) => data.id,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "amount",
    accessorFn: (data) =>
      getAmount(
        data.balances.booked.amount.value.scale,
        data.balances.booked.amount.value.unscaledValue
      ),
  },
];

const AccountsList: React.FC<AccountsListProps> = ({ className, accounts }) => {
  const table = useReactTable({
    data: accounts,
    columns: accountColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <section className={cn("list-col", className)}>
      {/* No accounts | Account list */}
      {accounts.length === 0 ? (
        <Typography variant="lead" className="font-semibold text-lg">
          Not connected accounts
        </Typography>
      ) : (
        <ReactTable table={table} Component={AccountCard}>
          <SortableAccountsHeader />
          <ReactTableBody />
          <ReactTablePagination />
        </ReactTable>
      )}
    </section>
  );
};

export default AccountsList;
