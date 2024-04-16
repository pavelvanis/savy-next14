import React from "react";
import { getAuthSession } from "@/lib/auth";
import { getTransactions } from "@/actions/server/data";
import { getFormatedDate, groupByMonth } from "@/lib/utils";
import {
  Page,
  PageBody,
  PageNavbar,
  PageNavbarProps,
} from "@/components/layout/page-components";
import { Typography } from "@/components/ui";
import TransactionReactTable from "@/components/web/transactions/transaction-table";
import TransacationsMonthNavbar from "@/components/web/transactions/transactions-navbar";
import { ReactTableBody, ReactTablePagination } from "@/components/react-table";

interface TransactionDetailsPageProps {
  params: { month: string };
}

const TransactionDetailsPage: React.FC<TransactionDetailsPageProps> = async ({
  params: { month },
}) => {
  const { user } = await getAuthSession();
  const transactions = await getTransactions(user.permanentUserId);

  const transactionsByMonth = groupByMonth(
    transactions.data?.transactions || []
  );

  const transactionsForMonth = transactionsByMonth[month];

  const formatedDate = getFormatedDate(month);

  const transactionsDetailsNavbarprops: PageNavbarProps = {
    title: {
      children: (
        <>
          Transactions Details -{" "}
          <Typography as="span" variant="h2" className="font-normal inline">
            {formatedDate}
          </Typography>
        </>
      ),
    },
    button: false,
  };

  if (!transactions) {
    return <div>Transactions are not loaded</div>;
  }

  if (!transactionsForMonth) {
    return <div>No transactions for this month</div>;
  }

  return (
    <Page>
      <PageNavbar {...transactionsDetailsNavbarprops} />
      <PageBody>
        <TransactionReactTable transactions={transactionsForMonth}>
          <TransacationsMonthNavbar transactions={transactionsForMonth} />
          <ReactTableBody className="mt-3" />
          <ReactTablePagination />
        </TransactionReactTable>
      </PageBody>
    </Page>
  );
};

export default TransactionDetailsPage;
