import React from "react";
import {
  ReactTableButton,
  ReactTableHeader,
  ReactTableInput,
} from "@/components/react-table/";
import { Button, Typography } from "@/components/ui";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { getFormatedDate } from "@/lib/utils";

interface SortableTransactionsHeaderProps {
  date: string;
}

// TODO: Change the date format for the clients locale
const SortableTransactionsHeader: React.FC<SortableTransactionsHeaderProps> = ({
  date,
}) => {
  const formatedDate = getFormatedDate(date);
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
        className="bg-gray-300/30 hover:bg-gray-400/30 mr-4 px-2.5 py-1.5"
      >
        <Link
          className="flex-center gap-x-1"
          href={`/web/transactions/${date}`}
        >
          <Typography className="text-xs font-medium">Details</Typography>
          <ChevronRightIcon className="size-4" />
        </Link>
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
