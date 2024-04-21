"use client";

import { z } from "zod";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  Typography,
  Button,
  Input,
  Checkbox,
  Spinner,
} from "@/components/ui";
import { RegisterSchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { register as registerAction } from "@/actions/server/register";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";

const RegisterForm = () => {
  const [globalFormError, setGlobalFormError] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setGlobalFormError("");

    startTransition(() => {
      registerAction(values).then((data) => {
        if (data?.error) {
          setGlobalFormError(data.error);
        } else {
          reset();
          router.push(DEFAULT_LOGIN_REDIRECT);
        }
      });
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography
        variant="h1"
        color="blue-gray"
        className=" text-center font-bold"
      >
        Register
      </Typography>
      <form
        data-testid="cypress-register-form"
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 px-4 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-3 flex flex-col gap-6">
          <div>
            <Input
              data-testid="cypress-register-firstName"
              {...register("firstName")}
              type="text"
              size="lg"
              error={!!errors.firstName}
              label="First name"
            />
            <FormError
              data-testid="cypress-register-firstName-error"
              message={errors.firstName?.message}
            />
          </div>
          <div>
            <Input
              data-testid="cypress-register-lastName"
              {...register("lastName")}
              type="text"
              size="lg"
              error={!!errors.lastName}
              label="Last name"
            />
            <FormError
              data-testid="cypress-register-lastName-error"
              message={errors.lastName?.message}
            />
          </div>
          <div>
            <Input
              data-testid="cypress-register-email"
              {...register("email")}
              type="email"
              size="lg"
              error={!!errors.email}
              label="Email"
            />
            <FormError
              data-testid="cypress-register-email-error"
              message={errors.email?.message}
            />
          </div>
          <div>
            <Input
              data-testid="cypress-register-password"
              {...register("password")}
              type="password"
              size="lg"
              error={!!errors.password}
              label="Password"
            />
            <FormError
              data-testid="cypress-register-password-error"
              message={errors.password?.message}
            />
          </div>
          <div>
            <Input
              data-testid="cypress-register-checkPassword"
              {...register("confirmPassword")}
              type="password"
              size="lg"
              error={!!errors.confirmPassword}
              label="Confirm Password"
            />
            <FormError
              data-testid="cypress-register-checkPassword-error"
              message={errors.confirmPassword?.message}
            />
          </div>
          <div>
            <Checkbox
              data-testid="cypress-register-consents"
              {...register("consents")}
              className={errors.consents && "border-red-500"}
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the&nbsp;
                  <Link
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900 hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <FormError
              data-testid="cypress-register-constents-error"
              message={errors.consents?.message}
            />
          </div>
        </div>
        <FormError
          data-testid="cypress-register-error"
          className="mt-4 font-semibold"
          message={globalFormError || errors.root?.message}
        />
        <Button
          data-testid="cypress-register-btn"
          disabled={isPending}
          className="mt-6 flex justify-center items-center gap-2"
          type="submit"
          onClick={() => setGlobalFormError("")}
          fullWidth
        >
          {isPending && <Spinner className="h-4 w-4" />}
          {isPending ? "Loading..." : "Register"}
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-gray-900 hover:underline transition-all"
          >
            Login
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default RegisterForm;
