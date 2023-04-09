import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import WishlistProduct from "./WishlistProduct";
import { useLoaderData } from "react-router-dom";
import { Typography } from "@mui/material";

const Wishlist = () => {
  const wishlist = useLoaderData();
  const [data, setData] = useState(wishlist);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    if (deleteId) {
      setData((data) => data.filter((wishlist) => wishlist.id !== deleteId));
    }
  }, [deleteId]);

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {data.length === 0 && (
        <Typography variant="h3" mx="auto">
          No Product Found
        </Typography>
      )}
      {data.length !== 0 &&
        data.map((product) => (
          <WishlistProduct
            id={product.id}
            key={product.id}
            productId={product.productId}
            image={product.image}
            price={product.price}
            discount={product.discount}
            name={product.name}
            onDelete={setDeleteId}
          />
        ))}
    </Box>
  );
};

export default Wishlist;
