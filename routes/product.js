var express = require("express");
var router = express.Router();
const async = require('../middlewares/async')
const { product } = require("../controllers")
const { getProducts, getProductOptions, getCategories, getSubcategoriesByCategory, getOptionsByProduct, getProduct, getSubcategories } = product

router.get("/category", async(getCategories));
router.get("/subcategory/:category", async(getSubcategoriesByCategory));
router.get("/subcategory", async(getSubcategories));

router.get("/:handler", async(getProduct))

router.get("/", async(getProducts))
router.get("/options/:option", async(getProductOptions))
router.get("/:handler/:option", async(getOptionsByProduct));

module.exports = router;
