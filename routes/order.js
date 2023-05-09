const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const async = require('../middlewares/async')
const { order } = require("../controllers")

router.post("/", auth, async(order.createOrder));

router.get("/", auth, async(order.getOrder));

router.put("/status/:orderId", auth, async(order.updateOrderStatus));

router.get("/:orderId/:orderItemId", auth, async(order.getOrderDetails));

module.exports = router
