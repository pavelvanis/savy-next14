import React from "react";
import { PlusIcon } from "lucide-react";
import { Typography, Button } from "@/components/ui";
import { CredentialsSkeleton } from "@/components/layout/skeletons";

const SettingsCredentialsLoading = () => {
  return (
    <div className="">
      <div className=" page-header ">
        <Typography variant="h3" className="font-semibold inline w-min">
          Credentials
        </Typography>
        <Button variant="outlined" size="sm" className="">
          <PlusIcon className="size-5" />
          Add Credentials
        </Button>
      </div>
      <section className="list-col">
        <CredentialsSkeleton />
        <CredentialsSkeleton />
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

export default SettingsCredentialsLoading;
