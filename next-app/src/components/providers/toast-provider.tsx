"use client";

import React from "react";
import { toast, ToastT } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { tinkCallbackController } from "@/lib/tink/tink-callback-controller";

const ToastTypes = ["success", "error", "info"];

type ToastType = "success" | "error" | "info";

interface ToastProviderHandlerProps extends React.PropsWithChildren {}

/**
 * Toast provider handler component. Takes the searchParams and displays a
 * toast message based on the status and message.
 */
const ToastHandlerProvider: React.FC<ToastProviderHandlerProps> = ({
  children,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") as ToastType;
  let message = searchParams.get("message");

  message = decodeURIComponent(message || "");

  const showToast = () => {
    // Check if status is valid
    if (status && ToastTypes.includes(status) && message) {
      toast[status](message, { duration: 25000 });
    }
    // Change url
    const newUrl = window.location.pathname;
    router.push(newUrl);
  };

  React.useEffect(() => {
    return () => {
      showToast();
    };
  }, [status, message]);

  return <>{children}</>;
};

export default ToastHandlerProvider;
