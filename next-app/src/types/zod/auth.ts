import * as z from "zod";

export const ZodLoginUser = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const ZodRegisterUser = z.object({
  first_name: z.string().min(3).max(100),
  last_name: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  confirm_password: z.string().min(6).max(100),
});
