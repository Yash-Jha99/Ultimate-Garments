const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const async = require("../middlewares/async");
const { cart } = require("../controllers")

router.post("/", auth, async(cart.createCart));
router.get("/", auth, async(cart.getCart));

router.put("/:id", auth, async(cart.updateCart));

router.delete("/:id", auth, async(cart.deleteCart));

module.exports = router;
