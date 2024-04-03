import AccountsList from "@/components/web/accounts/accounts";
import { getAuthSession } from "@/lib/auth";
import { getAccounts } from "@/lib/tink/actions";
import React from "react";

/**
 * Page to show all connected accounts and their details
 */
const AccountsPage = async () => {
  const { user } = await getAuthSession();
  const accounts = await getAccounts(user.permanentUserId);

  console.log("Accounts on the page: ", JSON.stringify(accounts, null, 2));

  if (accounts) return <AccountsList {...accounts} />;
  else return <div>Accounts could not be fetched</div>;
};

export default AccountsPage;
