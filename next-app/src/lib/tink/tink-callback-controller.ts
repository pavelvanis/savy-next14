import { TinkCallbackError } from "@/types/tink";

type Toast =
  | {
      status: "success" | "error" | "info";
      message: string;
    }
  | undefined;

export const tinkCallbackController = (
  searchParams: URLSearchParams
): Toast => {
  const { error, errorReason } = getErrorStates(searchParams);

  const { credentialsId } = getSuccessStates(searchParams);

  const defaultMessage = "Something went wrong. Please try again later";

  if (credentialsId) {
    return {
      status: "success",
      message: "Credentials added successfully",
    };
  }

  switch (error) {
    case "USER_CANCELLED":
      return { status: "error", message: "User cancelled the flow" };

    case "BAD_REQUEST":
      return { status: "error", message: errorReason || defaultMessage };

    case "INVALID_STATE":
      return { status: "error", message: "Invalid state" };

    case "AUTHENTICATION_ERROR":
      return { status: "error", message: errorReason || defaultMessage };

    case "TEMPORARY_ERROR":
      return { status: "error", message: "Temporary error" };

    case "INTERNAL_ERROR":
      return {
        status: "error",
        message: "Internal error. Please try this service later",
      };
  }
};

const getErrorStates = (params: URLSearchParams) => {
  const error = params.get("error") as TinkCallbackError;
  const errorReason = params.get("error_reason");
  const errorType = params.get("error_type");
  const message = params.get("message");
  const trackingId = params.get("tracking_id");
  const credentials = params.get("credentials_id");
  const providerName = params.get("provider_name");
  const paymentRequestId = params.get("payment_request_id");

  return {
    error,
    errorReason,
    errorType,
    message,
    trackingId,
    credentials,
    providerName,
    paymentRequestId,
  };
};

const getSuccessStates = (params: URLSearchParams) => {
  const state = params.get("state");
  const credentialsId = params.get("credentialsId");

  return { state, credentialsId };
};
