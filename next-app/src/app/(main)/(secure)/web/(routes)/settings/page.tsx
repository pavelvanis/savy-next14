import React from "react";
import {
  Page,
  PageNavbar,
  PageNavbarProps,
} from "@/components/layout/page-components";
import { Typography } from "@/components/ui";
import { getAuthSession } from "@/lib/auth";
import { HelpTooltip } from "@/components";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { user } = await getAuthSession();

  return {
    title: `${user.firstName} ${user.lastName} | Settings`,
  };
}

const settingsNavbarProps: PageNavbarProps = {
  title: {
    children: "Account",
    variant: "h3",
    className: "font-semibold",
  },
  button: false,
};

/**
 * This page allows the user to change the settings
 */
const SettingsPage = async () => {
  const { user } = await getAuthSession();
  return (
    <Page>
      <PageNavbar {...settingsNavbarProps} />
      <section className="page-body">
        <SettingsRow
          label="name:"
          value={`${user.firstName} ${user.lastName}`}
        />
        <SettingsRow label="email:" value={user.email} />
        <SettingsRow label="Generated user id:" value={user.permanentUserId}>
          <HelpTooltip content="This is permanent user id generated after you have registered and is used to accessing your data in banks." />
        </SettingsRow>
      </section>
    </Page>
  );
};

export default SettingsPage;

const SettingsRow: React.FC<{
  label: React.ReactNode;
  value: React.ReactNode;
  children?: React.ReactNode;
}> = ({ label, value, children }) => (
  <Typography as="div" className="flex items-center gap-x-2">
    {label}
    <Typography as="span" className="font-normal text-lg">
      {value}
    </Typography>
    {children}
  </Typography>
);
