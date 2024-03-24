declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Mongo database
      MONGO_URI: string;
      // Tink API
      TINK_CLIENT_ID: string;
      TINK_CLIENT_SECRET: string;
    }
  }
}

export {};
