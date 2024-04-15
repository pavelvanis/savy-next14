import React from "react";
import {
  ReactTableButton,
  ReactTableHeader,
  ReactTableInput,
} from "@/components/react-table/";
import { Button, Typography } from "@/components/ui";
import { ChevronRightIcon } from "lucide-react";

interface SortableTransactionsHeaderProps {
  date: string;
}

// TODO: Change the date format for the clients locale
const SortableTransactionsHeader: React.FC<SortableTransactionsHeaderProps> = ({
  date,
}) => {
  const [year, month] = date.split("-");
  const formatedDate = new Date(
    Number(year),
    Number(month) - 1
  ).toLocaleDateString("cs-CZ", {
    month: "long",
    year: "numeric",
  });
  return (
    <ReactTableHeader>
      <Typography
        variant="h4"
        className="font-bold capitalize whitespace-nowrap mr-2 ms-1"
      >
        {formatedDate}
      </Typography>
      <Button
        size="sm"
        variant="text"
        className="bg-gray-300/30 hover:bg-gray-400/30 mr-4 flex-center gap-x-1 px-2.5 py-1.5"
      >
        <Typography className="text-xs font-medium">Details</Typography>
        <ChevronRightIcon className="size-4" />
      </Button>
      <div className="flex flex-1 gap-x-2 ">
        <ReactTableInput
          column="description"
          label="Search by description..."
        />
        <ReactTableButton column="amount" label="Sort by amount" />
      </div>
    </ReactTableHeader>
  );
};

export default SortableTransactionsHeader;
