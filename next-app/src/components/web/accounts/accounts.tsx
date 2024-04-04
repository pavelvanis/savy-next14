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
  accounts
}) => {
  return (
    <div className="flex flex-col gap-y-6 h-full w-full mt-3">
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
  );
};

export default AccountsList;
