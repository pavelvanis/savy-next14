"use client";

import React from "react";
import {
  Card,
  CardHeader,
  Button,
  CardBody,
  Chip,
  Typography,
} from "@/components/ui";
import Link from "next/link";
import { getAmount } from "@/lib/utils";
import { TinkAccount } from "@/types/types";
import { Action } from "@/components/action";
import { BarChart3Icon, FileBarChart2Icon } from "lucide-react";

type AccountCardProps = TinkAccount & {};

const AccountCard: React.FC<AccountCardProps> = ({ ...props }) => {
  const { value, currencyCode } = props.balances.booked.amount;
  const { scale, unscaledValue } = value;
  const { iban } = props.identifiers.iban;
  return (
    <Card>
      {/* Card header */}
      <CardHeader className={"flex flex-col gap-y-3"}>
        {/* Top */}
        <div className="flex justify-between gap-y-1 gap-x-3 flex-wrap">
          <div className="flex gap-x-4">
            <Typography className=" text-lg font-bold">{props.name}</Typography>
            <Chip
              variant="ghost"
              className=" font-medium hidden sm:block "
              value={props.type}
            />
          </div>
          <Typography className="text-black font-bold text-xl">
            {getAmount(scale, unscaledValue)} {currencyCode}
          </Typography>
        </div>
        {/* bottom */}
        <div className="flex justify-between items-center gap-y-1 flex-wrap">
          <Typography className=" font-semibold">{iban}</Typography>
          {/* Actions */}
          <div className="flex gap-x-2">
            <Action>
              <FileBarChart2Icon className="p-0.5" />
            </Action>
            <Action>
              <BarChart3Icon className="p-0.5" />
            </Action>
          </div>
        </div>
      </CardHeader>
      {/* Card body */}
      <CardBody className={"flex flex-wrap gap-x-3 gap-y-1"}>
        <Button className=" bg-gray-800 hover:bg-gray-900 transition-all">
          <Link href="#">New transaction</Link>
        </Button>
        <Button className=" bg-gray-800 hover:bg-gray-900 transition-all">
          <Link href={`/web/accounts/${props.id}`}>Overview</Link>
        </Button>
      </CardBody>
    </Card>
  );
};

export default AccountCard;
