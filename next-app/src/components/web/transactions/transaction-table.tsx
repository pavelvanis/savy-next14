"use client";

import React from "react";
import { TinkTransaction } from "@/types/tink";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn, getAmount } from "@/lib/utils";
import { Typography } from "@/components/ui";
import { ReactTable } from "@/components/react-table";
import TransactionCard from "./transaction-card";

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

interface TransactionReactTableProps
  extends React.PropsWithChildren,
    PropsWithClassName {
  transactions: TinkTransaction[];
}

const TransactionReactTable: React.FC<TransactionReactTableProps> = ({
  className,
  children,
  transactions,
}) => {
  const table = useReactTable({
    data: transactions,
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (transactions.length < 1) {
    return (
      <Typography variant="lead" className="font-semibold">
        No transactions found
      </Typography>
    );
  } else {
    return (
      <section className={cn(className)}>
        <ReactTable Component={TransactionCard} table={table}>
          {children}
        </ReactTable>
      </section>
    );
  }
};

export default TransactionReactTable;
