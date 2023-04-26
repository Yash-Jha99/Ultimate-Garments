var express = require("express");
var router = express.Router();
var db = require("../middlewares/db");
const { admin, auth } = require("../middlewares/auth");
var uuid = require("uuid").v4;

router.post("/category", auth, admin, (req, res, next) => {
  db.query(
    "insert into category (id,name,icon) values (?,?,?)",
    [uuid(), req.body.category, req.body.image],
    (error, result) => {
      if (error) return next(error);
      else return res.status(201).send("Category created successfully");
    }
  );
});

router.post("/subcategory", auth, admin, (req, res, next) => {
  db.query(
    "insert into subcategory (id,name,icon,category_id) values (?,?,?,?)",
    [uuid(), req.body.subcategory, req.body.image, req.body.categoryid],
    (error, result) => {
      if (error) return next(error);
      else return res.status(201).send("Category created successfully");
    }
  );
});

router.post("/product", auth, admin, (req, res, next) => {
  const {
    name,
    price,
    category,
    subcategory,
    discount,
    description,
    rating,
    sizes,
    colors,
    image,
  } = req.body;
  const pid = uuid();
  let query = "insert into product_options values ";
  sizes
    .split(",")
    .forEach(
      (size) =>
        (query = query.concat("('", pid, "','", size, "','", "size", "'),"))
    );
  colors
    .split(",")
    .forEach(
      (color) =>
        (query = query.concat("('", pid, "','", color, "','", "color", "'),"))
    );
  query = query.slice(0, -1);

  db.query(
    "insert into products (id,name,price,category_id,subcategory_id,discount,description,rating,image) values (?,?,?,?,?,?,?,?,?)",
    [
      pid,
      name,
      price,
      category,
      subcategory,
      discount,
      description,
      rating,
      image,
    ],
    (error, result) => {
      if (error) return next(error);
      else
        db.query(query, (error, result) => {
          if (error) return next(error);
          else return res.status(200).send("Category created successfully");
        });
    }
  );
});

module.exports = router;
