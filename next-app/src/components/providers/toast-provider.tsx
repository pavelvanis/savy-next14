"use client";

import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { tinkCallbackController } from "@/lib/tink/tink-callback-controller";

const ToastTypes = ["success", "error", "info"];

interface ToastProviderHandlerProps extends React.PropsWithChildren {}

/**
 * Toast provider handler component. Takes the searchParams and displays a
 * toast message based on the status and message.
 */
const ToastHandlerProvider: React.FC<ToastProviderHandlerProps> = ({
  children,
}) => {
  const router = useRouter();

  const tinkToast = tinkCallbackController();

  const showToast = () => {
    // Check if status is valid
    if (
      tinkToast &&
      ToastTypes.includes(tinkToast.status) &&
      tinkToast.message
    ) {
      toast[tinkToast.status](tinkToast.message, { duration: 25000 });
    }
    // Change url
    const newUrl = window.location.pathname;
    router.push(newUrl);
  };

  React.useEffect(() => {
    return () => {
      showToast();
    };
  }, [tinkToast]);

  return <>{children}</>;
};

export default ToastHandlerProvider;
