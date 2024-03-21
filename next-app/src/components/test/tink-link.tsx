"use client";

import React from "react";
import Link from "next/link";
import { TinkConfig } from "@/config/tink";
import { createTinkLink } from "@/lib/tink/link";
import { getCsrfToken } from "next-auth/react";

const TinkLink = async () => {
  const token = await getCsrfToken();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Link
        className=" bg-indigo-900 rounded-md text-white px-1.5 py-1"
        href={createTinkLink({
          endpoint: "/authorize",
          redirect_uri: TinkConfig.callback,
          scope: TinkConfig.scope,
          client_id: "550bf1db18934585a01d81310dfa3824",
          state: token,
        })}
      >
        Tink link
      </Link>
    </div>
  );
};

export default TinkLink;
