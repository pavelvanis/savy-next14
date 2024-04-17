"use client";

import React from "react";
import { cn, getAmount } from "@/lib/utils";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  ChartOptions,
  ChartData,
} from "chart.js";
import { TinkTransaction } from "@/types/tink";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    colors: {
      enabled: true,
    },
  },
  scales: {
    x: {
      ticks: {
        padding: 10,
      },
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        padding: 30,
      },
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
};

type DateAmountData = Record<string, number>;

const chartData = (
  data: DateAmountData
): (() => ChartData<"line", DateAmountData, unknown>) => {
  return () => ({
    datasets: [
      {
        data,
        borderColor: "rgba(0, 0, 0, 0.1)",
        backgroundColor: "green",
      },
    ],
  });
};

interface TransactionsBalancesChartProps extends PropsWithClassName {
  transactions: TinkTransaction[];
}

export const TransactionsBalancesChart: React.FC<
  TransactionsBalancesChartProps
> = ({ className, transactions }) => {
  // Structure data
  const data_t = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.dates.booked).toISOString().split("T")[0];

    const amount = getAmount(
      transaction.amount.value.scale,
      transaction.amount.value.unscaledValue
    );

    acc[date] ? (acc[date] += amount) : (acc[date] = amount);

    return acc;
  }, {} as DateAmountData);

  const sortedData = Object.entries(data_t)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .reduce((acc, [date, amount]) => {
      acc[date] = amount;
      return acc;
    }, {} as DateAmountData);

  return (
    <Line
      className={cn(className)}
      data={chartData(sortedData)()}
      options={options}
    />
  );
};
