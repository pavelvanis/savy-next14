"use client";
import React from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, Typography, Button, Input, Checkbox } from "@/components/ui";
import { RegisterSchema } from "@/schemas";
import { cn } from "@/lib/utils";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log("submitted", values);
  };

  React.useEffect(() => {
    console.log(errors);
    if (errors) {
    }
  }, [errors]);

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Register
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Input
            {...register("password")}
            type="password"
            size="lg"
            error={!!errors.password}
            label="Name"
          />
          <Input
            {...register("password")}
            type="password"
            size="lg"
            error={!!errors.password}
            label="Email"
          />
          <Input
            {...register("password")}
            type="password"
            size="lg"
            error={!!errors.password}
            label="Password"
          />
        </div>
        <div className="flex gap-2 items-center">
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Typography
            variant="small"
            color="gray"
            className="font-medium transition-colors hover:text-gray-900 underline underline-offset-2"
            as={Link}
            href="#"
          >
            Terms and Conditions
          </Typography>
        </div>
        <Button className="mt-6" type="submit" fullWidth>
          register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-gray-900">
            Login
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default RegisterForm;
