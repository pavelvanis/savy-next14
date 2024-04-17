import { TinkTransaction } from "@/types/tink";
import {
  getBalance,
  getExpensesAmount,
  getIncomeAmount,
  groupByMonth,
} from "./utils";

//
// ------------------ Calculate Increase Percentage ------------------

/**
 * Calculate the percentage increase from a previous value to a current value.
 *
 * @param {number} previous - The previous value.
 * @param {number} current - The current value.
 * @returns {number} The percentage increase, rounded to two decimal places. If the previous value is 0, returns 100.
 */
export const calculateIncreasePercentage = (
  previous: number,
  current: number
): number => {
  // If the previous value is 0, we consider any current value to be a 100% increase.
  if (previous === 0 && current === 0) {
    return 0;
  }
  if (previous === 0) {
    return current < 0 ? -100 : 100;
  }

  // Calculate the absolute increase.
  const increase = current - previous;

  // Calculate the percentage increase.
  const percentageIncrease = (increase / previous) * 100;

  // Round the percentage increase to two decimal places and return it.
  return parseFloat(percentageIncrease.toFixed(2));
};

//
// ------------------ Get Previous Month ------------------

/**
 * Get the transactions of the previous month.
 *
 * @param {string} currentMonth - The current month in the format "YYYY-MM".
 * @param {TinkTransaction[]} transactions - The list of transactions.
 * @returns {TinkTransaction[]} The transactions of the previous month.
 */
export const getPreviousMonth = (
  currentMonth: string,
  transactions: TinkTransaction[] | undefined
): TinkTransaction[] => {
  // Group transactions by month.
  const transactionsByMonth = groupByMonth(transactions || []);

  // Split the current month into year and month.
  const [year, _month] = currentMonth.split("-");

  // Calculate the previous month. If the current month is January (0), the previous month is December (12).
  const prevMonth = Number(_month) === 0 ? 12 : Number(_month) - 1;

  // Format the previous month in the format "YYYY-MM".
  const prevYearMonth = `${year}-${prevMonth}`;

  // Return the transactions of the previous month.
  return transactionsByMonth[prevYearMonth];
};

/**
 * Get the transactions of the current month.
 *
 * @param {string} currentMonth - The current month in the format "YYYY-MM".
 * @param {TinkTransaction[]} transactions - The list of transactions.
 * @returns {TinkTransaction[]} The transactions of the current month.
 */
export const getCurrentMonth = (
  currentMonth: string,
  transactions: TinkTransaction[] | undefined
): TinkTransaction[] => {
  // Group transactions by month.
  const transactionsByMonth = groupByMonth(transactions || []);

  // Return the transactions of the previous month.
  return transactionsByMonth[currentMonth];
};

//
// ------------------ Get Month Balances ------------------

/**
 * Calculate the income, expenses, and balance for a given set of transactions.
 *
 * @param {TinkTransaction[]} transactions - The list of transactions.
 * @returns {MonthBalances} An object containing the income, expenses, and balance.
 */

export type MonthBalances = {
  income: number;
  expenses: number;
  balance: number;
};

export const getMonthBalances = (
  transactions: TinkTransaction[]
): MonthBalances => {
  return {
    income: getIncomeAmount(transactions),
    expenses: getExpensesAmount(transactions),
    balance: getBalance(transactions),
  };
};
