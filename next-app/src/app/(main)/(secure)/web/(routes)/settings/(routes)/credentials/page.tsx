import React from "react";
import { getAuthSession } from "@/lib/auth";
import { Typography } from "@/components/ui";
import { getCredentials } from "@/actions/server/data";
import SettingsCredentials from "@/components/web/settings/credentials";

const SettingsCredentialsPage = async () => {
  const { user } = await getAuthSession();
  const credentials = await getCredentials(user.permanentUserId);

  console.log(JSON.stringify(credentials.data?.credentials, null, 2));

  if (!credentials.data)
    return <Typography>{credentials.error.message}</Typography>;
  return <SettingsCredentials {...credentials.data} />;
};

export default SettingsCredentialsPage;
