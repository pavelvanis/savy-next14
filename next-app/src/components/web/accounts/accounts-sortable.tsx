"use client";

import React from "react";
import { Input, Typography, Button } from "@/components/ui";
import { useReactTableData } from "@/components/sort-table/sort";
import { SortingState } from "@tanstack/react-table";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SortableAccountsHeader = () => {
  const { table } = useReactTableData();
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "amount",
      desc: true,
    },
  ]);

  React.useEffect(() => {
    table.getState().sorting = sorting;
    table.setSorting(sorting);
  }, [sorting]);

  return (
    <div className="flex h-10 gap-x-3">
      <Input
        label="Search by account name..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
      />
      <div className="h-10 w-full max-w-40 relative">
        <button
          tabIndex={1}
          className="w-full h-full border border-blue-gray-200 focus:border-2 focus:border-gray-900 px-2 py-0.5 flex-center cursor-pointer rounded-lg"
          onClick={() => {
            setSorting((prev) => [
              {
                id: "amount",
                desc: prev[0].desc ? false : true,
              },
            ]);
          }}
        >
          <Typography className="flex items-center gap-x-2 text-sm font-semibold whitespace-nowrap text-blue-gray-700">
            Sort by amount
            <ChevronDownIcon
              className={cn("size-4", sorting[0].desc && "rotate-180")}
            />
          </Typography>
        </button>
      </div>
    </div>
  );
};

export default SortableAccountsHeader;
