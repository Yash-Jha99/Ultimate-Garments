var express = require("express");
var router = express.Router();
var db = require("../middlewares/db");

router.get("/category", (req, res, next) => {
  db.query("select * from category", (error, result) => {
    if (error) return next(error);
    else return res.status(200).send(result);
  });
});

router.get("/subcategory", (req, res, next) => {
  db.query(
    `select * from subcategory`,
    [req.params.category, req.params.category],
    (error, result) => {
      if (error) return next(error);
      else return res.status(200).send(result);
    }
  );
});

router.get("/:handler", (req, res, next) => {
  let product = { wishlistId: null };
  const { handler } = req.params;
  const rawhandler = handler.replace(/-/gi, " ");

  const colorQuery = `SELECT distinct handler,color as label,(select image from product_options where handler like ?  limit 1) as image FROM product_options where handler like ?`;

  db.query(
    "select * from products where handler=?",
    [handler],
    (error, result) => {
      if (error) return next(error);
      else if (!result[0]) return res.status(200).send(null);
      else product = { ...result[0], ...product };
      db.query(
        "select id,sku, size ,color, price ,stock as quantityInStock from product_options where handler = ?",
        [handler],
        (err, result) => {
          if (err) return next(err);
          product.options = result;
          const colorHandler = `${rawhandler
            .replace(result[0].color.toLowerCase(), "")
            .replace(/\s/gi, "-")}%`;
          db.query(colorQuery, [colorHandler, colorHandler], (err, result) => {
            if (err) next(err);
            else product.colors = result;
            if (req.user)
              db.query(
                "select id from wishlist where product_id=? and user_id=?",
                [product.id, req.user.id],
                (error, result) => {
                  if (error) next(error);
                  else if (result[0]) product.wishlistId = result[0].id;
                  return res.status(200).send(product);
                }
              );
            else return res.status(200).send(product);
          });
        }
      );
    }
  );
});

router.get("/", (req, res, next) => {
  const {
    size,
    color,
    search,
    price,
    pageNumber,
    pageSize,
    category,
    subcategory,
  } = req.query;

  let sizeFilter, colorFilter;
  const filters = [];
  let query = `select distinct p.id ,p.name,p.price,p.discount,p.image,p.handler, ${req.user ? "w.id" : null
    } as wishlistId from products p `;

  if (category)
    query += `join category c on c.id=p.category_id and c.name="${category}"`;

  if (subcategory)
    query += ` join subcategory s on s.id=p.subcategory_id and s.name="${subcategory}"`;

  if (search) query += `join category c on c.id=p.category_id`;

  if (size || color) {
    sizeFilter = size
      ?.split("+")
      .map((f) => `'${f}'`)
      .join(",");

    colorFilter = color
      ?.split("+")
      .map((f) => `'${f}'`)
      .join(",");

    query += ` join product_options po on po.handler=p.handler`;
  }

  if (req.user) {
    query += ` left join wishlist w on p.id = w.product_id and w.user_id = "${req?.user?.id}"`;
  }

  if (sizeFilter) filters.push(` size in (${sizeFilter})`);

  if (colorFilter) filters.push(` color in (${colorFilter})`);

  if (search) {
    filters.push(
      ` lower(c.name) like "%${search.toLowerCase()}%" or lower(p.name) like "%${search.toLowerCase()}%"`
    );
  }

  if (sizeFilter || colorFilter || search) {
    query += " where" + filters.join(" and ");
  }

  if (price) {
    query += ` order by price ${price}`;
  }

  if (pageNumber && pageSize)
    query += ` limit ${pageSize} offset ${pageSize * (pageNumber - 1)}`;
  else query += " limit 24";

  db.query(query, (error, result) => {
    if (error) return next(error);
    else return res.status(200).send(result);
  });
});

router.get("/subcategory/:category", (req, res, next) => {
  db.query(
    `select *,? as category from subcategory where category_id=(select id from category where name=? )`,
    [req.params.category, req.params.category],
    (error, result) => {
      if (error) return next(error);
      else return res.status(200).send(result);
    }
  );
});

router.get("/options/:option", (req, res, next) => {
  const { option } = req.params;
  const { category, subcategory } = req.query;
  db.query(
    `select distinct ${option} from product_options po join products p on po.handler=p.handler and p.subcategory_id=(select id from subcategory where name=? and category_id=(select id from category where name=?)) where ${option} is not null`,
    [subcategory, category],
    (error, result) => {
      if (error) return next(error);
      else return res.status(200).send(result);
    }
  );
});

router.get("/:handler/:option", (req, res, next) => {
  const { option, handler } = req.params;
  db.query(
    `select distinct ${option} , id from product_options po where ${option} is not null and handler=? `,
    [handler],
    (error, result) => {
      if (error) next(error);
      else res.status(200).send(result);
    }
  );
});

module.exports = router;
