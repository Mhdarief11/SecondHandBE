/** Destruct environment variable to get database configuration */
const {
  DB_USERNAME = 'jwinnkro',
  DB_PASSWORD = 'OgJsWz-YRr-okvnF6c_be8-mtU_qv-5R',
  DB_HOST = 'rosie.db.elephantsql.com',
  DB_NAME = 'jwinnkro',
} = process.env

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_production`,
    host: DB_HOST,
    dialect: 'postgres',
  },
}
