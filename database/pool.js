const Pool = require('pg').Pool;

require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_PG_USER,
  host: process.env.DB_PG_HOST,
  database: process.env.DB_PG_DATABASE,
  password: process.env.DB_PG_PASSWORD,
  port: process.env.DB_PG_PORT,
});

module.exports = pool;