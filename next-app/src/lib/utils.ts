import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to merge Tailwind CSS classes with other classes
 * @param inputs - The classes to merge
 * @returns The merged classes
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Calculates and formats an amount based on a scale and an unscaled value.
 *
 * @param scale - The scale of the amount, can be a number or a string.
 * @param unscaledValue - The unscaled value of the amount, can be a number or a string.
 * @returns A string representing the calculated amount, formatted with spaces as thousands separators.
 */
export const getAmount = (
  scale: number | string,
  unscaledValue: number | string
) => {
  let amount;

  if (typeof scale === "string" && typeof unscaledValue === "string") {
    amount = 10 ** -parseInt(scale, 10) * parseInt(unscaledValue, 10);
  } else if (typeof scale === "number" && typeof unscaledValue === "number") {
    amount = 10 ** -scale * unscaledValue;
  } else {
    return "NaN";
  }

  // TODO: change the format
  return amount.toLocaleString("en-US").replace(/,/g, " ");
};

/**
 * Checks if the provided environment variables are set.
 *
 * @param {...string[]} arg - The names of the environment variables to check.
 * @throws Will throw an error if any of the provided environment variables is not set.
 *
 * @example
 * checkEnv('MONDODB_URI', 'CLIENT_ID');
 */
export const checkEnv = (...arg: string[]) => {
  const unsetEnv = arg.some(e => !process.env[e]);

  if (unsetEnv) {
    throw Error(`Environment variable \`${unsetEnv}\` is not set.`);
  }
};

const LOG = false;

// TODO: Create logger
/**
 * Function which logs the arguments to the console.
 * Does not log in production.
 */
export const log = function (...args: any[]) {
  if (process.env.NODE_ENV === "production" || !LOG) return;
  args.forEach((arg) => {
    console.log(arg);
  });
  console.log("\n\n");
};
