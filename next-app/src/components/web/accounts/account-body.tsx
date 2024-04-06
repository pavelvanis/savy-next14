import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, CardBody } from "@/components/ui";

type AccountBodyProps = PropsWithClassName & { accountId: string };

const AccountBody: React.FC<AccountBodyProps> = ({ className, accountId }) => {
  return (
    <CardBody className={cn("flex flex-wrap gap-x-3 gap-y-1", className)}>
      <Button className=" bg-gray-800 hover:bg-gray-900 transition-all">
        <Link href="#">New transaction</Link>
      </Button>
      <Button className=" bg-gray-800 hover:bg-gray-900 transition-all">
        <Link href={`/web/accounts/${accountId}`}>Overview</Link>
      </Button>
    </CardBody>
  );
};

export default AccountBody;
