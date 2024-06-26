"use client";

import { Button } from "@/components/ui";
import React from "react";
import { toast } from "sonner";

const ToastPage = () => {
  return (
    <div className=" w-screen h-screen flex flex-col items-center justify-center gap-y-7">
      <Button onClick={() => toast("This is a toast message")}>toast</Button>
      <Button onClick={() => toast.success("This is a success toast message", {position:"bottom-center"})}>Success toast</Button>
      <Button onClick={() => toast.error("This is a error toast message")}>error toast</Button>
      <Button onClick={() => toast.info("This is a info toast message")}>Info toast</Button>
    </div>
  );
};

export default ToastPage;
