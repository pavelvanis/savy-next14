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
import { Button, IconButton, Input, Typography } from "@/components/ui";

import { TablePagination } from "@/components/sort-table";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "statusUpdated",
      desc: true,
    },
  ]);
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
      <div className="flex h-10 gap-x-3">
        <Input
          label="Search by provider name..."
          value={
            (table.getColumn("providerName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("providerName")?.setFilterValue(event.target.value)
          }
        />
        <div
          className=" px-2 py-0.5 border flex-center cursor-pointer rounded-lg border-blue-gray-200"
          onClick={() => {
            setSorting((prev) => [
              {
                id: "statusUpdated",
                desc: prev[0].desc ? false : true,
              },
            ]);
          }}
        >
          <Typography className="flex items-center gap-x-2 text-sm font-semibold whitespace-nowrap text-blue-gray-700">
            Sort by last updated
            <ChevronDownIcon
              className={cn("size-4", !sorting[0].desc && "rotate-180")}
            />
          </Typography>
        </div>
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
