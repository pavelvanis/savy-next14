import React from "react";
import { cn } from "@/lib/utils";
import { Card, Typography } from "@/components/ui";
import { TinkCredential, TinkCredentials } from "@/types/tink";

type SettingsCredentialsProps = PropsWithClassName & TinkCredentials & {};

const SettingsCredentialsList: React.FC<SettingsCredentialsProps> = async ({
  credentials,
  className,
}) => {
  return (
    <section className={cn("list-col", className)}>
      {credentials.length === 0 && (
        <Typography variant="lead" className="font-medium text-lg">
          You don&apos;t have any credentials connected yet
        </Typography>
      )}
      {credentials.map((credential) => (
        <CredentialsCard {...credential} />
      ))}
    </section>
  );
};

export default SettingsCredentialsList;

type CredentialsCard = PropsWithClassName & TinkCredential & {};

// TODO: Make configurable loacale date
const CredentialsCard: React.FC<CredentialsCard> = ({ ...props }) => {
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between flex-wrap w-full mb-2">
        <Typography className="text-lg font-semibold text-black">
          {props.providerName}
        </Typography>
        <Typography className="text-sm ">
          Last update:{" "}
          {new Date(props.statusUpdated).toLocaleDateString("cs-CZ")}
        </Typography>
      </div>
      <ul className=" list-disc list-inside ms-1">
        <li className=" antialiased font-normal">
          Session expires:{" "}
          {new Date(props.sessionExpiryDate).toLocaleDateString("cs-CZ")}
        </li>
        <li className=" antialiased font-normal">{props.statusPayload}</li>
      </ul>
    </Card>
  );
};
