import React from "react";
import { cn } from "@/lib/utils";
import { TinkAccount } from "@/types/types";
import { Button } from "@/components/ui";

type AccountBodyProps = TinkAccount & PropsWithClassName & {};

const AccountBody: React.FC<AccountBodyProps> = ({ className, ...props }) => {
  return (
    <div className={cn("pt-2 space-x-3", className)}>
      <Button className=" bg-gray-800 hover:bg-gray-900 transition-all">New transaction</Button>
      <Button className=" bg-gray-800 hover:bg-gray-900 transition-all">Overview</Button>
    </div>
  );
};

export default AccountBody;
