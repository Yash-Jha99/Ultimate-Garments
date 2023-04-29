require("dotenv").config();
const db = require("serverless-mysql")(process.env.MYSQL_URI);
db.connect()
  .then(() => console.log("Connected to MySQL"))
  .catch(() => console.log("MySQL connection error"))
  .finally(() => db.end());

module.exports = db;
