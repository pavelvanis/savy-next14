// ----------------------------------------------------------------------
// Database types

import { NextResponse } from "next/server";

export type User = {
  user_id: string;
  name: string;
  email: string;
};

// ----------------------------------------------------------------------
// API types

export type ApiLoginBody = {
  email: string;
  password: string;
};

export type ApiRegisterBody = {
  user: Omit<User, "user_id">;
};

type ErrorResponse = { errors: object; message?: never };
type MessageResponse = { errors?: never; message?: string; data?: any };

export type ApiResponse =
  | NextResponse<ErrorResponse | MessageResponse>
  | undefined;

// ----------------------------------------------------------------------
// Tink API types

export type TinkPermanentUser = {
  user_id: string;
  external_user_id: string;
};
