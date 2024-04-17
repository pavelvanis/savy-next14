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
import { TransactionsBalancesChart } from "@/components/web/transactions/transactins-chart";
import {
  getPreviousMonth,
} from "@/lib/data-utils";

interface TransactionDetailsPageProps {
  params: { month: string };
}

const TransactionDetailsPage: React.FC<TransactionDetailsPageProps> = async ({
  params: { month },
}) => {
  const { user } = await getAuthSession();
  const transactions = await getTransactions(user.permanentUserId);

  if (!transactions.data?.transactions) {
    NoTransactions();
  }

  if (transactions.error) {
    return <TransactionsFetchError />;
  }

  const transactionsByMonth = groupByMonth(
    transactions.data?.transactions || []
  );

  const previousMonth = getPreviousMonth(
    month,
    transactions.data?.transactions
  );

  const currentMonth = transactionsByMonth[month];

  if (!currentMonth) {
    return <div>No transactions for this month</div>;
  }

  const transactionsDetailsNavbarprops: PageNavbarProps = {
    title: {
      children: (
        <>
          Transactions Details -{" "}
          <Typography as="span" variant="h2" className="font-normal inline">
            {getFormatedDate(month)}
          </Typography>
        </>
      ),
    },
    callbackUrl: "/web/transactions",
    button: false,
  };

  return (
    <Page>
      <PageNavbar {...transactionsDetailsNavbarprops} />
      <PageBody>
        {/* Transaction list */}
        <TransactionReactTable transactions={currentMonth}>
          <TransacationsMonthNavbar
            transactions={currentMonth}
            previousMonth={previousMonth}
          />
          <ReactTableBody className="mt-3" />
          <ReactTablePagination />
        </TransactionReactTable>
        {/* Transaction chart */}
        <div className="flex flex-col max-w-xl mx-auto justify-center mt-16">
          <Typography className="font-semibold text-xl text-center">
            Trend line for this month
          </Typography>
          <TransactionsBalancesChart transactions={currentMonth} />
        </div>
      </PageBody>
    </Page>
  );
};

export default TransactionDetailsPage;

const NoTransactions = () => {
  return <div>No transactions for this month</div>;
};

const TransactionsFetchError = () => {
  return <div>Transactions are fetched with error</div>;
};

const NoPreviousMonth = () => {
  return <div>No previous month</div>;
};
