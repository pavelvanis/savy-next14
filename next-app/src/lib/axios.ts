import axios from "axios";

// instance for Tink API

export const TinkApiAxios = axios.create({
  baseURL: "https://api.tink.com/api/v1",
});
