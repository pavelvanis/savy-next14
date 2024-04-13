import React from "react";
import { ReactTableButton, ReactTableInput } from "@/components/react-table/";

const SortableTransactionsHeader = () => {
  return (
    <div className="flex h-10 gap-x-3">
      <ReactTableInput column="description" label="Search by description..." />
      <ReactTableButton id="amount" label="Sort by amount" />
    </div>
  );
};

export default SortableTransactionsHeader;
