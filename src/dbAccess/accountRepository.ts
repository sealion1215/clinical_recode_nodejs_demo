import { ILoginRequest } from "@controllers/accountController";
import mysqlConnection from "./mysqlConnection";

const TABLE_NAME = "clinic_account";

export interface IAccount extends ILoginRequest{
  clinic: string,
  phone_number: string,
  address: string
}

export const createNewAccount = (account: IAccount, callback: (result: any) => number) => {
  const query = `insert into ${TABLE_NAME} set ?`;
  mysqlConnection.query(query, account, (err, res) => {
    if (err) {
      console.error('create new clinic account error', err.message);
      return callback(new Error(err.message));
    } else {
      console.log("createNewAccount result", res);
      return callback(res.insertId);
    }
  });
}

export const getAccount = (req: ILoginRequest, callback: (result: any) => any) => {
  const conditionArray: any[] = [req.email, req.password];
  let query = `select * from ${TABLE_NAME} where email = ? and password = ?`;
  mysqlConnection.query(query, conditionArray, (err, res) => {
    if (err) {
      console.error('get account error', err.message);
      return callback(new Error(err.message));
    } else {
      console.log("getAccount result", res);
      callback(res);
    }
  });
}