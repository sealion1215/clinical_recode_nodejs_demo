import { createNewConsultationRecord, getConsultationRecord, IClinicalRecord } from "@dbAccess/clientRecordRepository";

export const serviceCreateConsultationRecord = (req: IClinicalRecord, callback: (res: any) => any) => {
  createNewConsultationRecord(req, (result) => {
    console.log("after service", result);
    return callback(result);
  });
}

export const serviceGetConsultationRecord = (query: any, callback: (res: any) => any) => {
  getConsultationRecord(query, (result) => {
    console.log("after service", result);
    return callback(result);
  });
}
