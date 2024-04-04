import * as tinkAuth from './tink-auth';
import * as tinkData from './tink-data';
import * as tinkUser from './tink-user';

export const tinkApi = {
  ...tinkAuth,
  ...tinkData,
  ...tinkUser,
};