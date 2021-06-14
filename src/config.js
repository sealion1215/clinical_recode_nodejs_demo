const config = {
  port: process.env.PORT? process.env.PORT: 8081,
  mysqlConfig: {
    host: process.env.DB_HOST? process.env.DB_HOST: "localhost",
    port: process.env.DB_PORT? process.env.DB_PORT: 3306,
    user: process.env.DB_USER? process.env.DB_USER: "clinic_admin",
    password: process.env.DB_PASSWORD? process.env.DB_PASSWORD: "clinic",
    database: "clinical_db"
  },
  tokenSecret: process.env.TOKEN_SECRET? process.env.TOKEN_SECRET: "secret",
  tokenExpireTimeInSec: process.env.TOKEN_EXPIRE_TIME? process.env.TOKEN_EXPIRE_TIME: 3600
}

exports.configInUse = config;