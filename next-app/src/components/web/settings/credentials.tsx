import React from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";
import { addCredentialsLink } from "@/lib/tink/link";
import { Button, Card, Typography } from "@/components/ui";
import { TinkCredential, TinkCredentials } from "@/types/tink";
import { generateAuthorizationCode } from "@/actions/server/data";

type SettingsCredentialsProps = PropsWithClassName & TinkCredentials & {};

const SettingsCredentials: React.FC<SettingsCredentialsProps> = async ({
  credentials,
  className,
}) => {
  const { user } = await getAuthSession();
  const authorizationCode = await generateAuthorizationCode(
    user.permanentUserId
  );

  return (
    <div className={cn("", className)}>
      <div className=" page-header ">
        <div className="space-x-2">
          <Typography variant="h3" className="font-semibold inline w-min">
            Credentials
          </Typography>
          <Typography className="w-min inline">
            ({credentials.length})
          </Typography>
        </div>
        {authorizationCode?.data && (
          <Button variant="outlined" size="sm" className="btn-hover">
            <Link
              className=" flex items-center gap-2"
              href={addCredentialsLink(
                authorizationCode.data.code,
                user.permanentUserId
              )}
            >
              <PlusIcon className="size-5" />
              Add Credentials
            </Link>
          </Button>
        )}
      </div>
      <section className="list-col">
        {credentials.length === 0 && (
          <Typography variant="lead" className="font-semibold">
            You don&apos;t have any credentials connected yet
          </Typography>
        )}
        {credentials.map((credential) => (
          <CredentialsCard {...credential} />
        ))}
      </section>
      <section className=" space-y-3 mt-7">
        <Typography className="text-sm text-gray-600">
          * A credentials object holds the information that is required when
          authenticating towards a provider. If the bank does not specify
          otherwise, the credentials object is valid for 90 days.
        </Typography>
      </section>
    </div>
  );
};

export default SettingsCredentials;

type CredentialsCard = PropsWithClassName & TinkCredential & {};

// TODO: Make configurable loacale date
const CredentialsCard: React.FC<CredentialsCard> = ({ ...props }) => {
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between w-full mb-2">
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
