"use client";

import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { CredentialsCard } from "./web/settings/credentials";
import { TinkCredential } from "@/types/tink";
import {
  Button,
  IconButton,
  Input,
  Select,
  Option,
  ButtonGroup,
  Typography,
} from "@material-tailwind/react";
import {
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { TablePagination } from "./sort-table/sort-pagination";

interface FilterSortTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const FilterSortTable = <TData, TValue>({
  data,
  columns,
}: FilterSortTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
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
      <div className="mb-3">
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
      <div className="flex flex-col gap-y-3">
        {table.getRowModel().rows?.length
          ? table.getRowModel().rows.map((row) => {
              return <CredentialsCard {...(row.original as TinkCredential)} />;
            })
          : "No data"}
      </div>
      {/* Pagination */}
      <TablePagination table={table} />
    </div>
  );
};
