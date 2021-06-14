import mysqlConnection from "./mysqlConnection";

const TABLE_NAME = "consultation_record";

export interface IClinicalRecord {
  clinic: string,
  doctor_name: string,
  patient_name: string,
  diagnosis: string,
  medication: string,
  consultation_fee: number,
  date: Date,
  follow_up?: boolean
}

export const createNewConsultationRecord = (clientRecord: IClinicalRecord, callback: (result: any) => number) => {
  const query = `insert into ${TABLE_NAME} set ?`;
  mysqlConnection.query(query, clientRecord, (err, res) => {
    if (err) {
      console.error('create new consultation record error', err.message);
      return callback(new Error(err.message));
    } else {
      return callback(res.insertId);
    }
  });
}

export const getConsultationRecord = (req: any, callback: (result: any) => any) => {
  const DEFAULT_PAGINATION_NUMBER = 25;
  const conditionArray: any[] = [];
  let query = `select * from ${TABLE_NAME}`;
  if (req.from) {
    query += ' where date >= ?';
    conditionArray.push(req.from);
  }
  if (req.to) {
    query += req.from? ' and date <= ?': ' where date <= ?';
    conditionArray.push(req.to);
  }
  query += ' limit ?';
  if (req.limit || req.limit===0) {
    conditionArray.push(req.limit);
  } else {
    conditionArray.push(DEFAULT_PAGINATION_NUMBER);
  }
  if (req.offset) {
    query += ' offset ?';
    conditionArray.push(req.offset);
  }
  mysqlConnection.query(query, conditionArray, (err, res) => {
    if (err) {
      console.error('get consultation record error', err.message);
      return callback(new Error(err.message));
    } else {
      console.log(res);
      return callback(res);
    }
  });
}