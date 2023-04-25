var mysql = require("mysql");
require("dotenv").config();

var db = mysql.createConnection(process.env.MYSQL_URI);

const cb = (err) => {
  if (!err) console.log("Connected to MySQL");
  else console.log(err);
};

db.connect(cb);

db.on("error", (error) => {
  console.log(error);
});

module.exports = db;
