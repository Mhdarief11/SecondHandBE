/** Destruct environment variable to get database configuration */
// const {
//   DB_USERNAME = '',
//   DB_PASSWORD = '',
//   DB_HOST = '',
//   DB_NAME = '',
// } = process.env
const path = require('path')
const DB_TEST_FILE_PATH = path.join(__dirname, '../db/test.sqlite')

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    storage: DB_TEST_FILE_PATH,
    logging: false,
    dialect: "sqlite",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
