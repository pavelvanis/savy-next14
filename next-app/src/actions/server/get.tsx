"use client";
import { Button } from "@/components/ui";
import { getCredentials } from "./credentials";

export const GetCredentailsButton = ({ userId }: { userId: string }) => {
  const submit = async () => {
    await getCredentials(userId);
  };

  return <Button onClick={submit}>get credentials</Button>;
};
