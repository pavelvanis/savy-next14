import React from "react";
import { auth, getAuthSession } from "@/lib/auth";
import { getAccountBalancesById, getAccountById } from "@/lib/tink/actions";
import { notFound } from "next/navigation";

type AccountIdPageProps = {
  params: {
    id: string;
  };
};

const AccountIdPage = async ({ params }: AccountIdPageProps) => {
  console.log(params);
  const { user } = await getAuthSession();

  const account = await getAccountById(user.permanentUserId, params.id);
  const balances = await getAccountBalancesById(
    user.permanentUserId,
    params.id
  );

  if (!account || !balances) {
    return notFound();
  }

  console.log("User account: \n", JSON.stringify(account, null, 2));
  console.log("User balances: \n", JSON.stringify(balances, null, 2));

  return <div>AccountIdPage</div>;
};

export default AccountIdPage;
