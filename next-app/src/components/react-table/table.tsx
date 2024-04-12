"use client";

import React from "react";
import { ColumnDef, Table } from "@tanstack/react-table";
import { Typography } from "../ui";
import { cn } from "@/lib/utils";
import { TablePagination } from "./table-pagination";

type ReactTableContextValue<TData> = {
  table: Table<TData>;
  Component: React.FC<TData>;
};

// ------------------- Context -------------------------
const ReactTableContext = React.createContext<ReactTableContextValue<any>>(
  {} as ReactTableContextValue<any>
);

// ------------------- Use context -------------------------
export const useReactTableData = <TData extends object>() => {
  const table = React.useContext(ReactTableContext);

  if (!table) {
    throw new Error("useReactTable should be used within <ReactTable>");
  }

  return table;
};

// ------------------- Context provider -------------------------
interface ReactTableProps<TData> extends React.PropsWithChildren {
  table: Table<TData>;
  Component: React.FC<TData>;
}
export const ReactTable = <TData extends object>({
  table,
  Component,
  children,
}: ReactTableProps<TData>) => {
  return (
    <ReactTableContext.Provider value={{ table, Component }}>
      {children}
    </ReactTableContext.Provider>
  );
};

// ------------------- React Table Body -------------------------
interface ReactTableBodyProps extends PropsWithClassName {}

export const ReactTableBody = ({ className }: ReactTableBodyProps) => {
  const { table, Component } = useReactTableData();
  return (
    <div className={cn("flex flex-col gap-y-3 my-5", className)}>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row, i) => {
          return <Component key={i} {...(row.original as any)} />;
        })
      ) : (
        <Typography variant="lead" className="font-medium text-lg">
          No results
        </Typography>
      )}
    </div>
  );
};

// ------------------- React Table Header -------------------------
interface ReactTablePaginationProps extends PropsWithClassName {}

export const ReactTablePagination = ({
  className,
}: ReactTablePaginationProps) => {
  const { table } = useReactTableData();
  return <TablePagination className={className} table={table} />;
};

// ------------------- React Table Header -------------------------
interface ReactTableHeaderProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export const ReactTableHeader = () => {};
