import React from "react";
import { notFound } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { getAccountBalancesById, getAccountById } from "@/actions/server/data";

type AccountIdPageProps = {
  params: {
    id: string;
  };
};

const AccountIdPage = async ({ params }: AccountIdPageProps) => {
  const { user } = await getAuthSession();

  const account = await getAccountById(user.permanentUserId, params.id);
  const balances = await getAccountBalancesById(
    user.permanentUserId,
    params.id
  );

  if (balances.error) return notFound();

  console.log("User account: \n", JSON.stringify(account, null, 2));
  console.log("User balances: \n", JSON.stringify(balances, null, 2));

  return (
    <div>
      <pre>{JSON.stringify(account, null, 2)}</pre>
      <pre>{JSON.stringify(balances, null, 2)}</pre>
    </div>
  );
};

export default AccountIdPage;
