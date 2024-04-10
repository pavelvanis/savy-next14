import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { ButtonGroup, IconButton, Typography } from "@material-tailwind/react";

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
    <div
      className={cn("flex justify-start gap-x-3 items-center mt-4", className)}
    >
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
        " !divide-none border border-gray-400 rounded-lg",
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
    <select
      className={cn(
        "bg-white border border-gray-400 rounded-lg select-none focus:outline-none h-5 text-sm",
        className
      )}
      value={table.getState().pagination.pageSize}
      onChange={(e) => {
        console.log("Changed");
        table.setPageSize(Number(e.target.value));
      }}
    >
      {pageSizeOptions.map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          {pageSize}
        </option>
      ))}
    </select>
  );
};
