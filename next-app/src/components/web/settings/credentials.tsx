import React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { FilterSortTable } from "@/components/react-table";
import { TinkCredential, TinkCredentials } from "@/types/tink";
import { CredentialsCard } from "./credential-card";

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

const SettingsCredentialsList: React.FC<SettingsCredentialsProps> = async ({
  credentials,
  className,
}) => {
  return (
    <section className={cn("list-col", className)}>
      {/* No accounts */}
      {credentials.length === 0 && (
        <Typography variant="lead" className="font-medium text-lg">
          You don&apos;t have any credentials connected yet
        </Typography>
      )}
      {/* Table of credentials */}
      <FilterSortTable
        Component={CredentialsCard}
        data={credentials}
        columns={columns}
      />
    </section>
  );
};

export default SettingsCredentialsList;
