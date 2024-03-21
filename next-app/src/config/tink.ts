// Configuration for Tink API and his services

export const TinkConfig = {
  url: "https://link.tink.com/1.0",
  scope: "accounts:read,transactions:read,user:read",
  callback: "http://localhost:3000/api/callback/authorize",
};
