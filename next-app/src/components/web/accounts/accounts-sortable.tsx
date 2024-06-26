"use client";

import React from "react";
import {
  ReactTableButton,
  ReactTableHeader,
  ReactTableInput,
} from "@/components/react-table/";

const SortableAccountsHeader = () => {
  return (
    <ReactTableHeader>
      <ReactTableInput label="Search by account name..." column="name" />
      <ReactTableButton label="Sort by amount" column="amount" />
    </ReactTableHeader>
  );
};

export default SortableAccountsHeader;
