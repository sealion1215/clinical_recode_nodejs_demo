import mysql from 'mysql';
import { configInUse } from 'config';

export default mysql.createConnection(configInUse.mysqlConfig);