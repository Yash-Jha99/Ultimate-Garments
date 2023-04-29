const express = require("express");
const router = express.Router();
const db = require("../middlewares/db");
const { auth } = require("../middlewares/auth");
var uuid = require("uuid").v4;

router.post("/", auth, (req, res, next) => {
  const { productId } = req.body;
  const id = uuid();

  db.query(
    "select id from wishlist where product_id=? and user_id=?",
    [productId, req.user.id],
    (error, result) => {
      if (error) next(error);
      else if (result[0]) res.status(400).send("Product already wishlisted");
      else
        db.query(
          "insert into wishlist values (?,?,?) ",
          [id, req.user.id, productId],
          (err, result) => {
            if (err) next(err);
            else
              db.query(
                "select id, name,price,discount,image from products where id= ? ",
                [productId],
                (err, result) => {
                  if (err) next(err);
                  else res.status(201).json({ ...result[0], wishlistId: id });
                }
              );
          }
        );
    }
  );
});

router.get("/", auth, (req, res, next) => {
  const { id: userId } = req.user;

  db.query(
    "select W.id,P.id as productId, P.name,P.price,P.discount,P.image,P.handler  from products P  join wishlist W on P.id=W.product_id and W.user_id=? ",
    [userId],
    (err, result) => {
      if (err) next(err);
      else res.status(200).send(result);
    }
  );
});

router.delete("/:id", auth, (req, res, next) => {
  const { id } = req.params;

  db.query("delete from wishlist where id=? ", [id], (err, result) => {
    if (err) next(err);
    else
      res
        .status(200)
        .json({ id: id, message: "Product removed from wishlist" });
  });
});

module.exports = router;
