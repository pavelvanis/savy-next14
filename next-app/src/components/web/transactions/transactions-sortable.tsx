import React from "react";
import {
  ReactTableButton,
  ReactTableHeader,
  ReactTableInput,
} from "@/components/react-table/";
import { Typography } from "@/components/ui";

interface SortableTransactionsHeaderProps {
  date: string;
}

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
        className="font-bold capitalize whitespace-nowrap mr-3 ms-1"
      >
        {formatedDate}
      </Typography>
      <ReactTableInput column="description" label="Search by description..." />
      <ReactTableButton column="amount" label="Sort by amount" />
    </ReactTableHeader>
  );
};

export default SortableTransactionsHeader;
