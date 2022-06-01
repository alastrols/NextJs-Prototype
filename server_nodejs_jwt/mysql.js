const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_jwt_login',
    dateStrings: 'date'
  })

const connection = pool.promise();



module.exports = {connection};