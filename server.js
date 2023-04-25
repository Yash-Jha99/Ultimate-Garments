var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// const db = require("./middlewares/db");
const useRouter = require("./routes/router");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use((req, res, next) => {
//   if (req.header("x-forwarded-proto") !== "https") {
//     res.redirect(`https://${req.header("host")}${req.url}`);
//   } else {
//     next();
//   }
// });

app.use(express.static(path.join(__dirname, "public")));

useRouter(app);

app.use(
  "/static",
  express.static(path.join(__dirname, "client", "build/static"))
);

app.use(
  "/manifest.json",
  express.static(path.join(__dirname, "client", "build", "manifest.json"))
);

app.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "client", "build", "favicon.ico"))
);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err.status) res.status(err.status).send(err);
  else {
    console.log("{ERROR}", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const port = process.env.PORT || 5000;

// if (process.env.NODE_ENV == "production") {

// }

app.listen(port, () => console.log(`Server is running at ${port}`));
