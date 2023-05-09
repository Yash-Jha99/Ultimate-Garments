var express = require("express");
var router = express.Router();
const { user } = require("../controllers");
const async = require('../middlewares/async')

router.post("/", async(user.createUser));

router.put("/:id", async(user.updateUser));

router.get("/:id", async(user.getUserById));

module.exports = router;
