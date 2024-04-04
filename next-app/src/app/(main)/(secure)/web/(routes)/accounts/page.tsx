import React from "react";
import { getAuthSession } from "@/lib/auth";
import { generateAuthorizationCode, getAccounts } from "@/lib/tink/actions";
import AccountsList from "@/components/web/accounts/accounts";
import { Button, Typography } from "@/components/ui";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { addCredentialsLink } from "@/lib/tink/link";

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
    <div className=" max-w-4xl flex-1 w-full ">
      {/* Header */}
      <div className="flex justify-between items-center w-full ">
        <Typography variant="h2" className="font-bold mb-2">
          Accounts
        </Typography>
        <div>
          {authorizationCode && (
            <Button
              variant="outlined"
              size="sm"
              className=" hover:bg-gray-200 transition-all duration-300"
            >
              <Link
                className=" flex items-center gap-2"
                href={addCredentialsLink(
                  authorizationCode?.code,
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
        <AccountsList {...accounts.data}  />
      ) : (
        <Typography variant="lead" className="font-semibold">
          {accounts.error}
        </Typography>
      )}
    </div>
  );

  // if (accounts) return <AccountsList {...accounts} />;
  // else return <div>Accounts could not be fetched</div>;
};

export default AccountsPage;
