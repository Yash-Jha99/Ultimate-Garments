var express = require("express");
var router = express.Router();
const { auth } = require("../middlewares/auth");
const { address } = require("../controllers");
const async = require('../middlewares/async')

router.post("/", auth, async(address.createAddress));

router.get("/", auth, async(address.getAddress));

router.delete("/:id", auth, async(address.deleteAddress));

router.put("/:id", auth, async(address.updateAddress));

module.exports = router;
