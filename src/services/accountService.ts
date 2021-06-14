import { createNewAccount, getAccount, IAccount } from "@dbAccess/accountRepository";
import { getToken } from './tokenService';
import { ILoginRequest } from '@controllers/accountController';

export const serviceRegisterAccount = (req: IAccount, callback: (res: any) => any) => {
  createNewAccount(req, (result: number | Error) => {
    console.log("after service", result);
    return callback(result);
  });
}

export const login = (req: ILoginRequest, callback: (res: any) => any) => {
  getAccount(req, (result) => {
    console.log("after service", result);
    if (result instanceof Error) {
      return callback(result);
    } else if (result.length === 0) {
      return callback(new Error("Wrong credentials"));
    } else {
      return callback(getToken(req.email));
    }
  });
}