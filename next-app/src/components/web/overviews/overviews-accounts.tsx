import React from "react";
import { IUser, TinkAccount } from "@/types/types";
import { getAccounts } from "@/actions/server/data";
import { Card, IconButton, Typography } from "@/components/ui";
import { getAmount } from "@/lib/utils";
import { BalanceText } from "../balance";
import { ListMinusIcon } from "lucide-react";

interface AccountsOverviewProps {
  user: IUser;
}

export const AccountsOverview: React.FC<AccountsOverviewProps> = async ({
  user,
}) => {
  const accountsResponse = await getAccounts(user.permanentUserId);

  const accounts = accountsResponse.data?.accounts;

  if (accounts)
    return (
      <div className="relative p-4 flex items-center gap-x-4">
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
      </div>
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
