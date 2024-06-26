export type TinkError = {
  statusCode: number;
  message: string;
};

type Success<T> = {
  data: T;
  error?: null;
};

type Failure = {
  data: null;
  error: TinkError;
};

export type TinkResponse<T> = Success<T> | Failure;
