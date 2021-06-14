import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { configInUse } from 'config';

const { tokenSecret, tokenExpireTimeInSec } = configInUse;

export const getToken = (email: string) => {
  const token = jwt.sign({ data: email }, tokenSecret, { expiresIn: tokenExpireTimeInSec });
  return token;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    console.log('null token');
    return res.sendStatus(401);
  } else {
    jwt.verify(token, tokenSecret, (err: any, result: any) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      console.log('token authentication success');
      next();
    });
  }
}
