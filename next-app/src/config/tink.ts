// Configuration for Tink API and his services

import { link } from "fs";
import { apiBaseUrl } from "next-auth/client/_utils";

export const TinkConfig = {
  apiBaseUrl: "https://api.tink.com",
  linkBaseUrl: "https://link.tink.com",
  callback: "http://localhost:3000/api/callback/authorize",
  market: "CZ",
  locale: "cs_CZ",
};
