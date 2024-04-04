import { getCredentials, getTransactions } from "@/actions/server/data";
import { getAuthSession } from "@/lib/auth";
import React from "react";

/**
 * Page to show all transaction history
 */
const Transactions = async () => {
  const { user } = await getAuthSession();
  const transactions = await getTransactions(user.permanentUserId);
  console.log("Transactions: ", JSON.stringify(transactions, null, 2));
  return (
    <div>
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
    </div>
  );
};

export default Transactions;
