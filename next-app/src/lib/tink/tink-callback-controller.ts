"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { TinkCallbackError } from "@/types/tink";

type Toast =
  | {
      status: "success" | "error" | "info";
      message: string;
    }
  | undefined;

export const tinkCallbackController = (): Toast => {
  const params = useSearchParams();

  // Take params from the URL
  const error = params.get("error") as TinkCallbackError;
  const error_reason = params.get("error_reason");
  const error_type = params.get("error_type");
  let message = params.get("message");
  const tracking_id = params.get("tracking_id");
  const credentials = params.get("credentials_id");
  const provider_name = params.get("provider_name");
  const payment_request_id = params.get("payment_request_id");

  const defaultMessage = "Something went wrong. Please try again later";

  switch (error) {
    case "USER_CANCELLED":
      return { status: "error", message: "User cancelled the flow" };

    case "BAD_REQUEST":
      return { status: "error", message: error_reason || defaultMessage };

    case "INVALID_STATE":
      return { status: "error", message: "Invalid state" };

    case "AUTHENTICATION_ERROR":
      message = error_reason || defaultMessage;
      return { status: "error", message };

    case "TEMPORARY_ERROR":
      return { status: "error", message: "Temporary error" };

    case "INTERNAL_ERROR":
      return {
        status: "error",
        message: "Internal error. Please try this service later",
      };
  }
};
