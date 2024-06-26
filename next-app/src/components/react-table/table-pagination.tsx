"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import {
  ButtonGroup,
  IconButton,
  Option,
  Select,
  Typography,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";

interface PaginationProps extends PropsWithClassName {
  table: Table<any>;
  pageSizeOptions?: number[];
}

const defaultPageSizeOptions = [5, 10, 20, 30];

export const TablePagination: React.FC<PaginationProps> = ({
  className,
  table,
  pageSizeOptions,
}) => {
  return (
    <div className={cn("flex justify-start gap-x-3 items-center", className)}>
      <PaginationButtons table={table} />
      <PaginationPageIndex table={table} />
      <PaginationPageSizeSelect
        table={table}
        pageSizeOptions={pageSizeOptions}
        className="ml-auto"
      />
    </div>
  );
};

export const PaginationButtons: React.FC<PaginationProps> = ({
  className,
  table,
}) => {
  return (
    <ButtonGroup
      variant="text"
      className={cn(
        " divide-gray-400/90 border border-gray-400 rounded-lg",
        className
      )}
    >
      <IconButton
        variant="text"
        className="w-6 h-6"
        size="sm"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeftIcon className="size-4" />
      </IconButton>
      <IconButton
        variant="text"
        className="w-6 h-6"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeftIcon className="size-4" />
      </IconButton>
      <IconButton
        variant="text"
        className="w-6 h-6"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRightIcon className="size-4" />
      </IconButton>
      <IconButton
        variant="text"
        className="w-6 h-6"
        size="sm"
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRightIcon className="size-4" />
      </IconButton>
    </ButtonGroup>
  );
};

export const PaginationPageIndex: React.FC<PaginationProps> = ({
  className,
  table,
}) => {
  return (
    <Typography as="span" className={cn(" text-xs", className)}>
      Page{" "}
      <strong>
        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </strong>
    </Typography>
  );
};

export const PaginationPageSizeSelect: React.FC<PaginationProps> = ({
  className,
  table,
  pageSizeOptions = defaultPageSizeOptions,
}) => {
  return (
    <div className="ml-auto flex-center gap-2 ">
      <Typography as="span" className="text-xs whitespace-nowrap">
        Show rows:
      </Typography>
      <Select
        offset={5}
        containerProps={{
          className: "w-14 h-6 right-0 ml-auto",
        }}
        labelProps={{
          className: "hidden",
        }}
        className={cn(
          "border border-gray-400 absolute top-1/2 right-0 -translate-y-1/2 px-1 py-0 h-6",
          className
        )}
        menuProps={{ className: "p-1 space-y-1" }}
        value={table.getState().pagination.pageSize.toString()}
        onChange={(e) => {
          table.setPageSize(Number(e));
        }}
      >
        {pageSizeOptions.map((pageSize) => (
          <Option key={pageSize} value={pageSize.toString()}>
            {pageSize}
          </Option>
        ))}
      </Select>
    </div>
  );
};
