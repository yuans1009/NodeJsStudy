const mysql = require('mysql2');

// don't create new connection for every request, but create a pool of connections

const pool = mysql.createPool({
  host: 'localhost', // or '127.0.0.1' if preferred
  user: 'user',
  database: 'node-complete',
  password: 'userpassword',
});

module.exports = pool.promise();