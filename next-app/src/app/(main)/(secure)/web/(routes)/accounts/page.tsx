import React from "react";
import Link from "next/link";
import { PlusIcon, WalletIcon } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import AccountsList from "@/components/web/accounts/accounts";
import { Button, Typography } from "@/components/ui";
import { addCredentialsLink } from "@/lib/tink/link";
import { getAccounts, generateAuthorizationCode } from "@/actions/server/data";

/**
 * Page to show all connected accounts and their details
 */
const AccountsPage = async () => {
  const { user } = await getAuthSession();

  const authorizationCode = await generateAuthorizationCode(
    user.permanentUserId
  );

  const accounts = await getAccounts(user.permanentUserId);

  console.log("Accounts on the page: ", JSON.stringify(accounts, null, 2));

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header ">
        <div className="flex items-center gap-x-4">
          <Typography variant="h2" className="font-bold">
            Accounts
          </Typography>
          <WalletIcon className="size-8" />
        </div>
        <div>
          {authorizationCode.data && (
            <Button
              variant="outlined"
              size="sm"
              className=" hover:bg-gray-200 transition-all duration-300"
            >
              <Link
                className=" flex items-center gap-2"
                href={addCredentialsLink(
                  authorizationCode.data.code,
                  user.permanentUserId
                )}
              >
                <PlusIcon className="size-5" />
                Add Account
              </Link>
            </Button>
          )}
        </div>
      </div>
      {accounts.data ? (
        <AccountsList className="page-body" {...accounts.data} />
      ) : (
        <Typography variant="lead" className="font-semibold">
          {accounts.error}
        </Typography>
      )}
    </div>
  );
};

export default AccountsPage;
