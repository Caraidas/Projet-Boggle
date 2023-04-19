const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "pass",
  database: "boggle",
});

module.exports = db;