"use client";

import React from "react";
import { cn, getAmount } from "@/lib/utils";
import { Typography } from "@/components/ui";
import { TinkTransaction, TinkTransactions } from "@/types/tink";
import {
  ReactTable,
  ReactTableBody,
  ReactTablePagination,
} from "@/components/react-table";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SortableTransactionsHeader from "./transactions-sortable";
import TransactionCard from "./transaction-card";

type TransactionListProps = PropsWithClassName & TinkTransactions & {};

const transactionColumns: ColumnDef<TinkTransaction>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "date",
    accessorFn: (data) => data.dates.booked,
  },
  {
    accessorKey: "amount",
    accessorFn: (data) =>
      getAmount(data.amount.value.scale, data.amount.value.unscaledValue),
  },
  {
    accessorKey: "status",
    accessorFn: (data) => data.status,
  },
  {
    accessorKey: "description",
    accessorFn: (data) => data.descriptions.display,
  },
  {
    accessorKey: "currencyCode",
    accessorFn: (data) => data.amount.currencyCode,
  },
  {
    accessorKey: "accountId",
    accessorFn: (data) => data.accountId,
  },
];

const TransactionList: React.FC<TransactionListProps> = ({
  className,
  transactions,
}) => {
  const table = useReactTable({
    data: transactions,
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <section className={cn("list-col", className)}>
      {/* Accounts */}
      {transactions.length === 0 ? (
        <Typography variant="lead" className="font-semibold">
          No accounts found
        </Typography>
      ) : (
        <ReactTable Component={TransactionCard} table={table}>
          <SortableTransactionsHeader />
          <ReactTableBody />
          <ReactTablePagination />
        </ReactTable>
      )}
    </section>
  );
};

export default TransactionList;
