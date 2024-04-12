"use client";

import {
  CheckIcon,
  Clock4Icon,
  ShieldCloseIcon,
  TimerOffIcon,
  Trash2Icon,
} from "lucide-react";
import { TinkCredential } from "@/types/tink";
import { Card, Typography } from "@/components/ui";

interface CredentialsCard extends PropsWithClassName, TinkCredential {}

type Status = "success" | "error" | "waiting" | "expired" | "deleted";

// TODO: Make configurable loacale date
export const CredentialsCard: React.FC<CredentialsCard> = ({ ...props }) => {
  const getStatus = (): Status => {
    switch (props.status) {
      // Successful
      case "CREATED":
      case "UPDATED":
        return "success";
      // Deleted
      case "DELETED":
        return "deleted";
      // Error
      case "AUTHENTICATION_ERROR":
      case "PERMANENT_ERROR":
      case "TEMPORARY_ERROR":
        return "error";
      // Expired
      case "SESSION_EXPIRED":
        return "expired";
      // Waiting
      case "AWAITING_MOBILE_BANKID_AUTHENTICATION":
      case "AWAITING_SUPPLEMENTAL_INFORMATION":
      case "AWAITING_THIRD_PARTY_APP_AUTHENTICATION":
      case "UPDATING":
        return "waiting";
      // Default
      default:
        return "waiting";
    }
  };
  const statusIcon = () => {
    switch (getStatus()) {
      case "success":
        return <CheckIcon className="size-5 text-green-700" />;
      case "deleted":
        return <Trash2Icon className="size-5" />;
      case "error":
        return <ShieldCloseIcon className="size-5 text-red-700" />;
      case "expired":
        return <TimerOffIcon className="size-5 text-amber-700" />;
      case "waiting":
        return <Clock4Icon className="size-5  text-blue-700" />;
      default:
        return null;
    }
  };
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between flex-wrap w-full mb-2">
        <Typography className="text-lg font-semibold text-black flex-center gap-3">
          {props.providerName}
          {statusIcon()}
        </Typography>
        <Typography className="text-sm ">
          Last update:{" "}
          {new Date(props.statusUpdated).toLocaleDateString("cs-CZ")}
        </Typography>
      </div>
      <ul className=" list-disc list-inside ms-1">
        {props.sessionExpiryDate && (
          <Typography as="li" className=" list-item font-normal">
            Session expires:{" "}
            {new Date(props.sessionExpiryDate).toLocaleDateString("cs-CZ")}
          </Typography>
        )}
        <Typography as="li" className=" list-item font-normal">
          {props.statusPayload}
        </Typography>
      </ul>
    </Card>
  );
};
