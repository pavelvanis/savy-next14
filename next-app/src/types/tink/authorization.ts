export type TinkAccessToken = {
  token_type: string;
  expires_in: number;
  access_token: string;
  scope: string;
  id_hint: string | null;
};

export type TinkAuthorizationCode = {
  code: string;
};

export type TinkPermanentUser = {
  user_id: string;
  external_user_id: string;
};
