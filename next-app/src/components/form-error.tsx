import { Typography } from "@/components/ui";
import { cn } from "@/lib/utils";

interface FormErrorProps extends PropsWithClassName {
  message?: string;
}

export const FormError = ({ message, className }: FormErrorProps) => {
  if (!message) return null;

  return (
    <Typography className={cn("text-red-500 ms-2 mt-1 text-sm", className)}>
      {message}
    </Typography>
  );
};
