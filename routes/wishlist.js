const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const async = require("../middlewares/async");
const { wishlist } = require("../controllers")

router.post("/", auth, async(wishlist.createWishlist));

router.get("/", auth, async(wishlist.getWishlist));

router.delete("/:id", auth, async(wishlist.deleteWishlist));

module.exports = router;
