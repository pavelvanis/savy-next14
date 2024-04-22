"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ReactTable,
  ReactTableBody,
  ReactTablePagination,
} from "@/components/react-table";
import { TinkCredential, TinkCredentials } from "@/types/tink";
import { CredentialsCard } from "./credential-card";
import SortableCredentialsHeader from "./credentials-sortable";
import NoDataBox from "../no-data";

const columns: ColumnDef<TinkCredential>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "providerName",
    header: "Provider",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "statusUpdated",
    header: "Last update",
  },
  {
    accessorKey: "statusPayload",
    header: "Payload",
  },
  {
    accessorKey: "updated",
    header: "Updated",
  },
  {
    accessorKey: "sessionExpiryDate",
    header: "Session expires",
  },
  {
    accessorKey: "userId",
    header: "User id",
  },
];

type SettingsCredentialsProps = PropsWithClassName & TinkCredentials & {};

const SettingsCredentialsList: React.FC<SettingsCredentialsProps> = ({
  credentials,
  className,
}) => {
  const table = useReactTable({
    data: credentials,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <section className={cn("", className)}>
      {/* No accounts | Credentials list */}
      {credentials.length === 0 ? (
        <NoDataBox>You don&apos;t have any credentials connected yet</NoDataBox>
      ) : (
        <ReactTable table={table} Component={CredentialsCard}>
          <SortableCredentialsHeader />
          <ReactTableBody />
          <ReactTablePagination />
        </ReactTable>
      )}
    </section>
  );
};

export default SettingsCredentialsList;
