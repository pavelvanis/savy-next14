"use client";
import React from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, Typography, Button, Input, Spinner } from "@/components/ui";
import { FormError } from "@/components/form-error";

import { LoginSchema } from "@/schemas";
import { login } from "@/server/login";

const LoginForm = () => {
  const [globalFormError, setError] = React.useState("");
  const [success, setSuccess] = React.useState<string | undefined>("");

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
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          reset();
          setError(data.error);
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
        Login
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 px-4 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-3 flex flex-col gap-6">
          <div>
            <Input
              {...register("email")}
              type="email"
              size="lg"
              error={!!errors.email}
              label="Email"
            />
            <FormError message={errors.email?.message} />
          </div>
          <div>
            <Input
              {...register("password")}
              type="password"
              size="lg"
              error={!!errors.password}
              label="Password"
            />
            <FormError message={errors.password?.message} />
          </div>
        </div>
        <FormError className="mt-4 font-semibold" message={globalFormError} />
        <Button
          disabled={isPending}
          className="mt-6 flex justify-center items-center gap-2"
          type="submit"
          onClick={() => setError("")}
          fullWidth
        >
          {isPending && <Spinner className="h-4 w-4" />}
          {isPending ? "Loading..." : "Login"}
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
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
