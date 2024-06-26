import { TinkConfig } from "@/config/tink";
import axios from "axios";

// instance for Tink API

export const TinkApiAxios = axios.create({
  baseURL: TinkConfig.apiBaseUrl,
});

export const LocalApiAxios = axios.create({
  baseURL: "http://localhost:3000/api/",
  // xsrfHeaderName: "X-CSRF-Token",
  // xsrfCookieName: "next-auth.csrf-token",
})