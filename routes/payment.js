const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const async = require('../middlewares/async')
const { payment } = require("../controllers")

router.post("/create-checkout-session", auth, async(payment.createCheckoutSession));

router.put("/status/:id", auth, async(payment.updatePaymentStatus));

module.exports = router;
