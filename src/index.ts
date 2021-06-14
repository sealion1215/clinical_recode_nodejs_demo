import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import { configInUse } from 'config';
import mysqlConnection from '@dbAccess/mysqlConnection';
import { clientRecordRouter } from '@controllers/clientRecordController';
import { accountRouter } from '@controllers/accountController';

const { port } = configInUse;

const start = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  clientRecordRouter(app);
  accountRouter(app);

  app.listen(port, async () => {
    mysqlConnection.connect(async err => {
      if(err) {
        console.error(err);
      } else {
        console.log("connected to database...");
        console.log(`listening on port ${port}...`);
      }
    });
  });
}

start();