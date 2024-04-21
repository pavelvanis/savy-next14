declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // General
      BASE_URL: string;
      // Mongo database
      DATABASE_NAME: string;
      MONGODB_URI: string;
      // Tink API
      TINK_CLIENT_ID: string;
      TINK_CLIENT_SECRET: string;
    }
  }
}

export {};
