"use client";

import { z } from "zod";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/server/login";
import { FormError } from "@/components/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  Typography,
  Button,
  Input,
  Spinner,
  LinkButton,
} from "@/components/ui";

const LoginForm = () => {
  const [globalFormError, setGlobalFormError] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setGlobalFormError("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            console.log(data);
            setGlobalFormError(data.error);
          } else {
            reset();
          }
        })
        .catch((error) => {
          console.log("Something.... :", error);
        });
    });
  };

  return (
    <Card
      color="white"
      shadow={true}
      className=" backdrop-blur-sm"
    >
      <Typography
        variant="h1"
        color="blue-gray"
        className=" text-center font-bold"
      >
        Login
      </Typography>
      <form
        data-testid="cypress-login-form"
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 px-4 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-3 flex flex-col gap-6">
          <div>
            <Input
              data-testid="cypress-login-email"
              {...register("email")}
              type="email"
              size="lg"
              error={!!errors.email}
              label="Email"
            />
            <FormError
              data-testid="cypress-login-email-error"
              message={errors.email?.message}
            />
          </div>
          <div>
            <Input
              data-testid="cypress-login-password"
              {...register("password")}
              type="password"
              size="lg"
              error={!!errors.password}
              label="Password"
            />
            <FormError
              data-testid="cypress-login-password-error"
              message={errors.password?.message}
            />
          </div>
        </div>
        <FormError className="mt-4 font-semibold" message={globalFormError} />
        <Button
          data-testid="cypress-login-btn"
          disabled={isPending}
          className="mt-6 flex justify-center items-center gap-2 text-black border border-black hover:ring-0 ring-1 ring-inset transition-all ring-black bg-gray-300/30 hover:bg-gray-200/50"
          type="submit"
          onClick={() => setGlobalFormError("")}
          fullWidth
        >
          {isPending && <Spinner className="h-4 w-4" />}
          {isPending ? "Loading..." : "Login"}
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className="font-medium text-gray-900 hover:underline transition-all"
          >
            Register
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default LoginForm;
