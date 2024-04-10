"use client";

import React from "react";
import {
  ColumnDef,
  SortingState,
  useReactTable,
  PaginationState,
  getCoreRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Input, Typography } from "@/components/ui";

import { TablePagination } from "@/components/sort-table";

interface FilterSortTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  Component: React.FC<TData>;
}

export const FilterSortTable = <TData, TValue>({
  data,
  columns,
  Component,
}: FilterSortTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    initialState: {
      columnVisibility: {
        id: false,
        providerName: true,
        type: true,
        status: true,
        statusUpdated: true,
        statusPayload: false,
        updated: false,
        sessionExpiryDate: true,
        userId: false,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <div>
      {/* Header */}
      <div className="">
        <Input
          label="Search by provider name..."
          value={
            (table.getColumn("providerName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("providerName")?.setFilterValue(event.target.value)
          }
        />
      </div>
      {/* Body */}
      <div className="flex flex-col gap-y-3 my-5">
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
      {/* Pagination */}
      <TablePagination table={table} />
    </div>
  );
};
