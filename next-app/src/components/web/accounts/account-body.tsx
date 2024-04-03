import React from "react";
import { cn } from "@/lib/utils";
import { TinkAccount } from "@/types/types";
import { Button } from "@/components/ui";
import Link from "next/link";

type AccountBodyProps = PropsWithClassName & { accountId: string };

const AccountBody: React.FC<AccountBodyProps> = ({ className, accountId }) => {
  return (
    <div className={cn("pt-2 space-x-3", className)}>
      <Button className=" bg-gray-800 hover:bg-gray-900 transition-all">
        <Link href="#">New transaction</Link>
      </Button>
      <Button className=" bg-gray-800 hover:bg-gray-900 transition-all">
        <Link href={`/web/accounts/${accountId}`}>Overview</Link>
      </Button>
    </div>
  );
};

export default AccountBody;
