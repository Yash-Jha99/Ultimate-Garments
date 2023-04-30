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
  const token = req.headers.authorization;
  if (token)
    try {
      req.user = verifyAuthToken(token);
    } catch (error) {
      console.log(error);
    }
  return next();
};

const auth = (req, res, next) => {
  const token = req.headers.authorization;
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
