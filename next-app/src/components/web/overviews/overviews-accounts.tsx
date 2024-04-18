import React from "react";
import { IUser, TinkAccount } from "@/types/types";
import { generateAuthorizationCode, getAccounts } from "@/actions/server/data";
import { Button, Card, IconButton, Typography } from "@/components/ui";
import { getAmount } from "@/lib/utils";
import { BalanceText } from "../balance";
import { ListMinusIcon } from "lucide-react";
import Link from "next/link";
import { addCredentialsLink } from "@/lib/tink/link";

interface AccountsOverviewProps {
  user: IUser;
}

// TODO: Handle errors
export const AccountsOverview: React.FC<AccountsOverviewProps> = async ({
  user,
}) => {
  const accountsResponse = await getAccounts(user.permanentUserId);

  const authCode = await generateAuthorizationCode(user.permanentUserId);

  const accounts = accountsResponse.data?.accounts;

  if (accounts)
    return (
      <section className="relative p-4 pt-3 flex flex-col gap-y-3">
        <nav className="flex justify-between items-center">
          <Typography variant="h5" className="font-bold text-black">
            All accounts
          </Typography>
          <Link
            href={
              authCode.data?.code
                ? addCredentialsLink(
                    authCode.data?.code,
                    user.permanentUserId,
                    "http://localhost:3000/web"
                  )
                : "#"
            }
          >
            <Button
              disabled={!authCode.data?.code}
              variant="text"
              size="sm"
              className="text-black border border-black hover:ring-1 ring-inset transition-all ring-black bg-gray-300/30 hover:bg-gray-200/50"
            >
              Add new account
            </Button>
          </Link>
        </nav>
        <div className="absolute rounded-lg top-0 left-0 h-full w-full bg-gradient-to-r from-gray-500/10 via-gray-100/30 to-gray-500/10 -z-10" />
        <div className="inline-flex flex-row items-center space-x-3 overflow-x-auto snap-x overscroll-auto no-scrollbar">
          {accounts.map((acc, i) => {
            return <AccountOverview key={i} {...acc} />;
          })}
          {accounts.map((acc, i) => {
            return <AccountOverview key={i} {...acc} />;
          })}
          {accounts.map((acc, i) => {
            return <AccountOverview key={i} {...acc} />;
          })}
        </div>
      </section>
    );
};

interface AccountOverviewProps extends TinkAccount {}

const AccountOverview: React.FC<AccountOverviewProps> = ({
  id,
  name,
  identifiers: {
    financialInstitution: { accountNumber },
  },
  balances: {
    booked: { amount },
  },
}) => {
  const amountValue = getAmount(amount.value.scale, amount.value.unscaledValue);
  return (
    <Card
      asLink
      href={`/web/accounts/${id}`}
      className="snap-start scroll-ml-1 p-3"
    >
      <Typography variant="h6" className="font-bold text-black">
        {name}
      </Typography>
      <Typography variant="lead" className=" text-xs font-normal">
        {accountNumber}
      </Typography>
      <div className="flex justify-between items-center mt-1">
        <BalanceText
          className="font-bold"
          amount={amountValue}
          currencyCode={amount.currencyCode}
        />
        <IconButton variant="text" size="sm" className="p-2 h-6 w-6">
          <ListMinusIcon className="size-4" />
        </IconButton>
      </div>
    </Card>
  );
};
