"use client";
import React from "react";
import {
  ReactTableButton,
  ReactTableInput,
} from "../../react-table/sort-components";
import { ReactTableHeader } from "@/components/react-table";

const SortableCredentialsHeader = () => {
  return (
    <ReactTableHeader>
      <ReactTableInput
        label="Search by provider name..."
        column="providerName"
      />
      <ReactTableButton
        className="max-w-48"
        label="Sort by last updated"
        column="statusUpdated"
      />
    </ReactTableHeader>
  );
};

export default SortableCredentialsHeader;
