"use client";
import React, { FormEvent } from "react";
import { csrf } from "../../../lib/auth";
import { LocalApiAxios } from "@/lib/axios";
import { headers } from "next/headers";

const TestCsrf = async () => {
  const { create } = await csrf();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await LocalApiAxios.post(
        "/auth/login",
        JSON.stringify({ email: "example@a.bb", password: "hesloheslo" }),
        // {
        //     xsrfHeaderName: "X-CSRF-Token",
        //     xsrfCookieName: "next-auth.csrf-token",
        // }
        // {
        //   headers: {
        //     "X-CSRF-Token": "TOKEN-HAHAHA",
        //   },
        // }
      );
      console.log("Data: ", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submit}>
      <input type="hidden" name="csrfToken" value={create} />
      <button>Submit CSRF</button>
    </form>
  );
};

export default TestCsrf;
