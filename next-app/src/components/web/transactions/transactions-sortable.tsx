import React from "react";
import {
  ReactTableButton,
  ReactTableHeader,
  ReactTableInput,
} from "@/components/react-table/";

const SortableTransactionsHeader = () => {
  return (
    <ReactTableHeader>
      <ReactTableInput column="description" label="Search by description..." />
      <ReactTableButton column="amount" label="Sort by amount" />
    </ReactTableHeader>
  );
};

export default SortableTransactionsHeader;
