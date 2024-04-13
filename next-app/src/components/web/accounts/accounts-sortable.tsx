"use client";

import React from "react";
import { ReactTableButton, ReactTableInput } from "@/components/react-table/";

const SortableAccountsHeader = () => {
  return (
    <div className="flex h-10 gap-x-3">
      <ReactTableInput label="Search by account name..." column="name" />
      <ReactTableButton label="Sort by amount" id="amount" />
    </div>
  );
};

export default SortableAccountsHeader;
