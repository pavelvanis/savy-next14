import React from "react";
import { TinkAccount } from "@/types/types";
import { Card } from "@/components/ui";
import AccountHeader from "./account-header";
import AccountBody from "./account-body";

type AccountCardProps = TinkAccount & {};

const AccountCard: React.FC<AccountCardProps> = ({ ...props }) => {
  return (
    <Card className=" border border-gray-200 p-3 w-full">
      {/* Card header */}
      <AccountHeader {...props} />
      {/* Card body */}
      <AccountBody {...props} />
    </Card>
  );
};

export default AccountCard;
