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
import { login } from "@/actions/client/login";
import { register as registerAction } from "@/actions/server/register";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";

const RegisterForm = () => {
  const [globalFormError, setGlobalFormError] = React.useState("");
  const [isPending, startTransition] = React.useState(false);

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

    startTransition(true);

    registerAction(values)
      .then((data) => {
        if (data?.error) {
          setGlobalFormError(data.error);
        }
        if (data?.success) {
          login(values).then((data) => {
            if ("error" in data) {
              router.push("/login");
            } else if ("success" in data) {
              reset();
              router.push(DEFAULT_LOGIN_REDIRECT);
            }
          });
          reset();
        }
      })
      .finally(() => {
        startTransition(false);
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
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 px-4 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-3 flex flex-col gap-6">
          <div>
            <Input
              {...register("firstName")}
              type="text"
              size="lg"
              error={!!errors.firstName}
              label="First name"
            />
            <FormError message={errors.firstName?.message} />
          </div>
          <div>
            <Input
              {...register("lastName")}
              type="text"
              size="lg"
              error={!!errors.lastName}
              label="Last name"
            />
            <FormError message={errors.lastName?.message} />
          </div>
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
          <div>
            <Input
              {...register("confirmPassword")}
              type="password"
              size="lg"
              error={!!errors.confirmPassword}
              label="Confirm Password"
            />
            <FormError message={errors.confirmPassword?.message} />
          </div>
          <div>
            <Checkbox
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
            <FormError message={errors.consents?.message} />
          </div>
        </div>
        <FormError
          className="mt-4 font-semibold"
          message={globalFormError || errors.root?.message}
        />
        <Button
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
