import AccountsList from "@/components/web/accounts/accounts";
import { getAuthSession } from "@/lib/auth";
import { generateAuthorizationCode, getAccounts } from "@/lib/tink/actions";
import React from "react";

/**
 * Page to show all connected accounts and their details
 */
const AccountsPage = async () => {
  const { user } = await getAuthSession();
  const accounts = await getAccounts(user.permanentUserId);

  const authorizationCode = await generateAuthorizationCode(
    user.permanentUserId
  );

  console.log("Accounts on the page: ", JSON.stringify(accounts, null, 2));

  return (
    <AccountsList
      {...accounts}
      authorizationCode={authorizationCode?.code}
      userId={user.permanentUserId}
    />
  );
};

export default AccountsPage;
