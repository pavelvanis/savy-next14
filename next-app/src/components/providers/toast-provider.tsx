"use client";

import React from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const ToastTypes = ["success", "error", "info"];

type ToastStatus = "success" | "error" | "info" | null;

interface ToastProviderHandlerProps extends React.PropsWithChildren {}

/**
 * Toast provider handler component. Takes the searchParams and displays a
 * toast message based on the status and message.
 */
const ToastHandlerProvider: React.FC<ToastProviderHandlerProps> = ({
  children,
}) => {
  const params = useSearchParams();
  const router = useRouter();

  const status = params.get("status") as ToastStatus;
  const message = params.get("message");

  const showToast = () => {
    // Check if status is valid
    if (status && ToastTypes.includes(status) && message) {
      toast[status](message, { duration: 10000 });
    }
    // Change url
    const newUrl = window.location.pathname;
    router.push(newUrl);
  };

  React.useEffect(() => {
    return () => {
      console.log("Toast changed", status, message);
      showToast();
    };
  }, [status, message]);

  return <>{children}</>;
};

export default ToastHandlerProvider;
