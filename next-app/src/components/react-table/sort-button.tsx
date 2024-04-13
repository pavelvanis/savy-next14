"use client";

import React from "react";
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import { useReactTableData } from "./table";
import { Typography } from "@material-tailwind/react";

/**
 * SortButtonProps interface for SortButton component
 * @interface
 * @property {string} id - The id of the column that this button will sort
 * @property {string} label - The label to display on the button
 */
interface SortButtonProps {
  id: string;
  label: string;
}

/**
 * A button that controls the sorting of a column in a react-table.
 * The button uses `useReactTableData()` context to get the table instance.
 * The current state is indicated by an icon on the button.
 */
const SortButton: React.FC<SortButtonProps> = ({ id, label }) => {
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

export { SortButton };
