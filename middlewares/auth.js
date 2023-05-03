var createError = require("http-errors");
const { verifyAuthToken } = require("./tokens");

const access = (req, res, next) => {
  if (req.app.get("env") === "development" || !req.path.includes("/api"))
    return next();
  const token = req.headers["access-token"];
  if (token === process.env.API_KEY) return next();
  next(createError(403));
};

const user = (req, res, next) => {
  const { token } = req.cookies;
  if (token)
    try {
      req.user = verifyAuthToken(token);
    } catch (error) {
      console.log(error);
      res.send(401).json({ message: "Invalid token" })
    }
  return next();
};

const auth = (req, res, next) => {
  const { token } = req.cookies;
  console.log(req.cookies)
  if (token) return next();
  next(createError(401));
};

const admin = (req, res, next) => {
  let { user } = req;
  if (user.isAdmin) return next();
  next(createError(403));
};

module.exports = {
  auth,
  access,
  admin,
  user,
};
