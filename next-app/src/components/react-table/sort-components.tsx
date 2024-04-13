"use client";

import React from "react";
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import { useReactTableData } from "./table";
import { Input, Select, Option, Typography } from "@material-tailwind/react";

//
// React Table Button Component -------------------------------------------------
//

/**
 * SortButtonProps interface for SortButton component
 * @interface
 * @property {string} id - The id of the column that this button will sort
 * @property {string} label - The label to display on the button
 */
interface ReactTableButtonProps {
  id: string;
  label: string;
}

/**
 * A button that controls the sorting of a column in a react-table.
 * The button uses `useReactTableData()` context to get the table instance.
 * The current state is indicated by an icon on the button.
 */
export const ReactTableButton: React.FC<ReactTableButtonProps> = ({
  id,
  label,
}) => {
  const { table } = useReactTableData();

  // Get the current sorting state of the column
  const sortingState = table.getColumn(id)?.getIsSorted().valueOf();

  return (
    <div className="h-10 w-full max-w-40 relative">
      <button
        tabIndex={1}
        className="w-full h-full border border-blue-gray-200 focus:border-2 focus:border-gray-900 px-2 py-0.5 flex-center rounded-lg"
        onClick={table.getColumn(id)?.getToggleSortingHandler()}
      >
        <Typography className="flex items-center gap-x-2 text-sm font-semibold whitespace-nowrap text-blue-gray-700">
          {label}
          <span className="size-4">
            {sortingState === false && (
              <ChevronsUpDownIcon className="h-full w-full" />
            )}
            {sortingState === "asc" && (
              <ChevronUpIcon className="h-full w-full" />
            )}
            {sortingState === "desc" && (
              <ChevronDownIcon className="h-full w-full" />
            )}
          </span>
        </Typography>
      </button>
    </div>
  );
};

//
// React Table Input Component -------------------------------------------------
//

/**
 * InputProps interface for Input component
 * @interface
 * @property {string} column - The id of the column that this input will filter
 * @property {string} label - The label to display on the input
 */
interface ReactTableInputProps {
  column: string;
  label: string;
}

/**
 * Input component that controls the filtering of a column in a react-table.
 * The input uses `useReactTableData()` context to get the table instance.
 */
export const ReactTableInput: React.FC<ReactTableInputProps> = ({
  column,
  ...props
}) => {
  const { table } = useReactTableData();
  return (
    <Input
      {...props}
      value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(column)?.setFilterValue(event.target.value)
      }
    />
  );
};

//
// React Table Select Component -------------------------------------------------
//

interface ReactTableSelectProps {
  column: string;
  options: React.ReactNode[] | string[];
  label: string;
}

export const ReactTableSelect: React.FC<ReactTableSelectProps> = ({
  ...props
}) => {
  return (
    <Select {...props} containerProps={{ className: "w-52" }}>
      <Option value="1">Option 1</Option>
    </Select>
  );
};
