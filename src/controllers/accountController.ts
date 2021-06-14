import { Router, Request, Response } from 'express';
import emailValidator from 'email-validator';
import md5 from 'md5';
import { serviceRegisterAccount, login as serviceLogin } from '@services/accountService';
import { IAccount } from '@dbAccess/accountRepository';

export interface ILoginRequest {
  email: string,
  password: string
}

const validateRegisterRequest = (req: IAccount) => {
  if (!validateLoginRequest(req)) {
    return false;
  }
  if (!req.clinic) {
    return false;
  }
  if (!req.phone_number) {
    return false;
  }
  if (!/^\d+$/.test(req.phone_number)) {
    return false;
  }
  if (!req.address) {
    return false;
  }
  return true;
}

const validateLoginRequest = (req: ILoginRequest) => {
  if (!req.email) {
    return false;
  }
  if (!emailValidator.validate(req.email)) {
    return false;
  }
  if (!req.password) {
    return false;
  }
  req.password = md5(req.password);
  return true;
}

export const accountRouter = (app: Router) => {
  const router = Router();
  app.use('/accounts', router);

  router.post('/register', (req: Request, res: Response) => {
    let validRequest = validateRegisterRequest(req.body);
    if (!validRequest) {
      return res.send("Bad Request").status(400);
    }
    serviceRegisterAccount(req.body, (result: number | Error) => {
      console.log("createRecord result", result);
      if (result instanceof Error) {
        console.error(result.message);
        return res.send("Create account failed").status(500);
      }
      return res.send({ "account_id": result });
    });
  });

  router.post('/login', (req: Request, res: Response) => {
    let validRequest = validateLoginRequest(req.body);
    if (!validRequest) {
      return res.send("Bad Request").status(400);
    }
    serviceLogin(req.body, result => {
      if (result instanceof Error) {
        if (result.message === "Wrong credentials") {
          return res.send("Wrong credentials").status(200);
        }
        return res.send("Login failed").status(500);
      }
      return res.send({ auth: true, "access_token": result });
    });
  });
};
