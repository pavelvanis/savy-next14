import React from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import AccountCard from "./account-card";
import { getAuthSession } from "@/lib/auth";
import { TinkAccounts } from "@/types/types";
import { Button, Typography } from "@/components/ui";
import { addCredentialsLink } from "@/lib/tink/link";
import { generateAuthorizationCode } from "@/lib/tink/actions";

type AccountsListProps = TinkAccounts & {};

const AccountsList: React.FC<AccountsListProps> = async ({
  accounts,
  ...props
}) => {
  const { user } = await getAuthSession();
  const authorizationCode = await generateAuthorizationCode(
    user.permanentUserId
  );
  return (
    <div className="mt-5 flex-1 w-full max-w-4xl">
      <div className="flex flex-col gap-y-6 h-full w-full">
        {/* Header */}
        <div className="flex justify-between">
          <Typography variant="h2" className="font-bold mb-2">
            Accounts
          </Typography>
          <div>
            <Button
              variant="outlined"
              size="sm"
              className=" hover:bg-gray-200 transition-all duration-300"
            >
              {authorizationCode && (
                <Link
                  className=" flex items-center gap-2"
                  href={addCredentialsLink(
                    authorizationCode?.code,
                    user.permanentUserId
                  )}
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Account
                </Link>
              )}
            </Button>
          </div>
        </div>
        {/* Accounts */}
        {accounts.length === 0 && (
          <Typography variant="lead" className="font-semibold">
            No accounts found
          </Typography>
        )}
        {accounts.map((acc, i) => (
          <AccountCard key={i} {...acc} />
        ))}
      </div>
    </div>
  );
};

export default AccountsList;
