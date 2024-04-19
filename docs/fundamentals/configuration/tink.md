# Tink

The Tink configuration in _**/src/config/tink.ts**_ establishes the default values for interacting with Tink.

```typescript
export const TinkConfig = {
  apiBaseUrl: "https://api.tink.com",
  linkBaseUrl: "https://link.tink.com",
  defaultCallback: "http://localhost:3000/api/callback",
  market: "CZ",
  locale: "cs_CZ",
};
```
