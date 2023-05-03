const express = require("express");
const Joi = require("joi");
const router = express.Router();
const db = require("../middlewares/db");
const { generateAuthToken } = require("../middlewares/tokens");

const validateReq = (req) => {
  const schema = Joi.object({
    mobileNumber: Joi.string().length(10).required(),
  });
  return schema.validate(req);
};
const validateOtp = (req) => {
  const schema = Joi.object({
    otp: Joi.string().length(6).required(),
    mobileNumber: Joi.string().length(10).required(),
  });
  return schema.validate(req);
};

router.post("/login", async (req, res, next) => {
  const { error } = validateReq(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  db.query(
    "select mobile_number from users where mobile_number=?",
    [req.body.mobileNumber],
    (err, result) => {
      if (err) return next(err);
      if (result[0]) return res.status(200).json({ isRegistered: true });
      else return res.status(200).json({ isRegistered: false });
    }
  );
});

router.get("/logout", async (req, res, next) => {
  res.status(200).cookie('token', null, { httpOnly: true, maxAge: 0 })
});

router.post("/validate", (req, res, next) => {
  const { error } = validateOtp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  db.query(
    "select id,name,email,mobile_number as mobileNumber,isAdmin from users where mobile_number=?",
    [req.body.mobileNumber],
    (err, result) => {
      if (err) return next(err);
      if (result[0]) {
        const { id, mobileNumber, email, name, isAdmin } = result[0];
        const token = generateAuthToken({
          id,
          mobileNumber,
          name,
          isAdmin,
        });
        return res.status(200).cookie('token', token, { httpOnly: true, maxAge: 604_800_800 }).send(token);
      } else return res.status(404).json({ message: "User doesn't exists!" })
    }
  );
});

module.exports = router;
