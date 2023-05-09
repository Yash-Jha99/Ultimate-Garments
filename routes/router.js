const createError = require("http-errors");
const indexRouter = require("./index");
const userRouter = require("./user");
const authRouter = require("./auth");
const addressRouter = require("./address");
const cartRouter = require("./cart");
const productRouter = require("./product");
const wishlistRouter = require("./wishlist");
// const adminRouter = require("./admin");
const paymentRouter = require("./payment");
const orderRouter = require("./order");
const { access, user } = require("../middlewares/auth");

module.exports = function (app) {
  app.use("/api/", indexRouter);
  app.use(access);
  app.use(user);
  app.use("/api/user", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/product", productRouter);

  app.use("/api/wishlist", wishlistRouter);
  app.use("/api/address", addressRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/payment", paymentRouter);

  // app.use("/api/admin", adminRouter);
  app.use(function (req, res, next) {
    if (req.path.includes("/api/")) return next(createError(404));
    next();
  });
};
