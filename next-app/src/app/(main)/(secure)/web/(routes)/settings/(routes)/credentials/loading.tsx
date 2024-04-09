import React from "react";
import { PlusIcon } from "lucide-react";
import { Typography } from "@/components/ui";
import { CredentialsSkeleton } from "@/components/layout/skeletons";
import {
  Page,
  PageNavbar,
  PageNavbarProps,
} from "@/components/layout/page-components";

const SettingsCredentialsLoading = () => {
  const credentialsNavbarProps: PageNavbarProps = {
    title: {
      children: "Credentials",
      variant: "h3",
      className: "font-semibold",
    },
    button: {
      children: "Add Credentials",
      icon: PlusIcon,
      size: "sm",
      link: null,
    },
  };

  return (
    <Page>
      {/* Navbar */}
      <PageNavbar {...credentialsNavbarProps} />
      {/* Skeletons of credentials */}
      <section className="list-col">
        <CredentialsSkeleton />
        <CredentialsSkeleton />
        <CredentialsSkeleton />
      </section>
      {/* Some helper texts for user */}
      <section className=" space-y-3 mt-7">
        <Typography className="text-sm text-gray-600">
          * A credentials object holds the information that is required when
          authenticating towards a provider. If the bank does not specify
          otherwise, the credentials object is valid for 90 days.
        </Typography>
      </section>
    </Page>
  );
};

export default SettingsCredentialsLoading;
