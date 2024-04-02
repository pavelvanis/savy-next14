import React from "react";
import { TinkAccounts } from "@/types/types";
import { Button, Typography } from "@/components/ui";
import AccountCard from "./account-card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { addCredentialsLink } from "@/lib/tink/link";

type AccountsListProps = TinkAccounts & {
  authorizationCode: string;
  userId: string;
};

const AccountsList: React.FC<AccountsListProps> = ({
  accounts,
  authorizationCode,
  userId,
  ...props
}) => {
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
              <Link
                className=" flex items-center gap-2"
                href={addCredentialsLink(authorizationCode, userId)}
              >
                <PlusIcon className="w-5 h-5" />
                Add Account
              </Link>
            </Button>
          </div>
        </div>
        {/* Accounts */}
        {accounts.map((acc, i) => (
          <AccountCard key={i} {...acc} />
        ))}
      </div>
    </div>
  );
};

export default AccountsList;
