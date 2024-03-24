import { TinkConfig } from "@/config/tink";
import axios from "axios";

// instance for Tink API

export const TinkApiAxios = axios.create({
  baseURL: TinkConfig.apiBaseUrl,
});
