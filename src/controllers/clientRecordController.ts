import { IClinicalRecord } from '@dbAccess/clientRecordRepository';
import { serviceCreateConsultationRecord, serviceGetConsultationRecord } from '@services/clientRecordService';
import { DATE_FORMAT } from '@services/constants';
import { authenticateToken } from '@services/tokenService';
import dayjs from 'dayjs';
import { Router, Request, Response } from 'express';

const validateListRequest = (query: any) => {
  if (query.from) {
    const day = dayjs(query.from, DATE_FORMAT);
    if (!day.isValid()) {
      return false;
    }
    query.from = day.toDate();
  }
  if (query.to) {
    const day = dayjs(query.to, DATE_FORMAT);
    if (!day.isValid()) {
      return false;
    }
    query.to = day.toDate();
  }
  if (query.limit || query.limit == 0) {
    if (query.limit != 0 && isNaN(query.limit)) {
      return false;
    }
    query.limit = Number(query.limit);
  }
  if (query.offset || query.offset == 0) {
    if (query.offset != 0 && isNaN(query.offset)) {
      return false;
    }
    query.offset = Number(query.offset);
  }
  return true;
}

const validateCreateRecordRequest = (req: IClinicalRecord) => {
  if (!req.clinic) {
    return false;
  }
  if (!req.consultation_fee && req.consultation_fee !== 0) {
    return false;
  }
  if (!req.date) {
    return false;
  }
  if (req.date) {
    const day = dayjs(req.date, DATE_FORMAT);
    if (!day.isValid()) {
      return false;
    }
    req.date = day.toDate();
  }
  if (!req.diagnosis) {
    return false;
  }
  if (!req.doctor_name) {
    return false;
  }
  if (!req.medication) {
    return false;
  }
  if (!req.patient_name) {
    return false;
  }
  return true;
}

export const clientRecordRouter = (app: Router) => {
  const router = Router();
  app.use('/records', router);

  router.get('/list', authenticateToken, (req: Request, res: Response) => {
    console.log("get list");
    let validRequest = validateListRequest(req.query);
    if (!validRequest) {
      return res.send("Bad Request").status(400);
    }
    serviceGetConsultationRecord(req.query, (result: number | Error) => {
      if (result instanceof Error) {
        console.error("Get record failed", result.message);
        return res.send("Get record failed").status(500);
      }
      console.log("list result", result);
      return res.send(result).status(200);
    });
  });

  router.post('/createRecord', authenticateToken, (req: Request, res: Response) => {
    console.log("post createRecord");
    let validRequest = validateCreateRecordRequest(req.body);
    if (!validRequest) {
      return res.send("Bad Request").status(400);
    }
    serviceCreateConsultationRecord(req.body, (result: number | Error) => {
      if (result instanceof Error) {
        console.error("Create record failed", result.message);
        return res.send("Create record failed").status(500);
      }
      console.log("createRecord result", result);
      return res.send({"record_id": result}).status(200);
    });
  });
};
