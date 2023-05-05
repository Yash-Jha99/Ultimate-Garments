var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const useRouter = require("./routes/router");
require("dotenv").config();
const app = express();

app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'https://ultimate-garments.vercel.app', "http://localhost:4173", "http://localhost:5173"] }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "public")));

useRouter(app);

if (process.env.NODE_ENV == "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
}

app.use(
  "/assets",
  express.static(path.join(__dirname, "client", "dist/assets"))
);

app.use(
  "/manifest.json",
  express.static(path.join(__dirname, "client", "dist", "manifest.json"))
);

app.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "client", "dist", "favicon.ico"))
);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err.status) res.status(err.status).send(err);
  else {
    console.log("[SERVER ERROR]:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port ", port));
