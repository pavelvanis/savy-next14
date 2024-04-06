import React from "react";
import { getAuthSession } from "@/lib/auth";

/**
 * This page allows the user to change the settings
 */
const SettingsPage = async () => {
  const { user } = await getAuthSession();
  return <div>Default account page</div>;
};

export default SettingsPage;
