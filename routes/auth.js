const express = require("express");
const router = express.Router();
const async = require('../middlewares/async')
const { auth } = require("../controllers")

router.post("/login", async(auth.login));

router.get("/logout", async(auth.logout));

router.post("/validate", async(auth.validateOtp))

module.exports = router
