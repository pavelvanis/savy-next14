"use client";
import { Button } from "@/components/ui";
import { getAccountBalancesById, getAccounts, getCredentials } from "@/lib/tink/actions";

export const GetCredentailsButton = ({ userId }: { userId: string }) => {
  const submit = async () => {
    await getCredentials(userId);
  };

  return <Button onClick={submit}>get credentials</Button>;
};

export const GetAccountsButton = ({ userId }: { userId: string }) => {
  const submit = async () => {
    await getAccounts(userId);
  };

  return <Button onClick={submit}>get accounts</Button>;
};