import React from "react";
import {
  generateAuthorizationCode,
  getCredentials,
} from "@/actions/server/data";
import {
  Page,
  PageContentError,
  PageContentHelper,
  PageNavbar,
  PageNavbarProps,
} from "@/components/layout/page-components";
import { PlusIcon } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { Typography } from "@/components/ui";
import { addCredentialsLink } from "@/lib/tink/link";
import SettingsCredentialsList from "@/components/web/settings/credentials";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { user } = await getAuthSession();

  return {
    title: `${user.firstName} ${user.lastName} | Credentials`,
  };
}

const SettingsCredentialsPage = async () => {
  const { user } = await getAuthSession();
  const credentials = await getCredentials(user.permanentUserId);
  const { data } = await generateAuthorizationCode(user.permanentUserId);

  const credentialsNavbarProps: PageNavbarProps = {
    title: {
      children: (
        <>
          Credentials
          <Typography className="font-normal text-sm inline ms-1 tracking-wide">
            ({credentials?.data?.credentials.length})
          </Typography>
        </>
      ),
      variant: "h3",
      className: "font-semibold",
    },
    button: {
      children: "Add Credentials",
      icon: PlusIcon,
      size: "sm",
      link: data
        ? addCredentialsLink(
            data.code,
            user.permanentUserId,
            `${process.env.BASE_URL}/api/callback/web/settings/credentials`
          )
        : null,
    },
  };

  return (
    <Page>
      {/* Header */}
      <PageNavbar {...credentialsNavbarProps} />
      {/* List of credentials */}
      {credentials.data ? (
        <SettingsCredentialsList className="page-body" {...credentials.data} />
      ) : (
        <PageContentError message={credentials.error.message} />
      )}
      {/* Some helper texts for user */}
      <section className=" space-y-3 mt-7">
        <PageContentHelper>
          A credentials object holds the information that is required when
          authenticating towards a provider. If the bank does not specify
          otherwise, the credentials object is valid for 90 days.
        </PageContentHelper>
      </section>
    </Page>
  );
};

export default SettingsCredentialsPage;
