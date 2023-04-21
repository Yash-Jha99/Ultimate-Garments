import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import WishlistProduct from "./WishlistProduct";
import { useLoaderData } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

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
    <Box boxShadow={2} p={2} bgcolor="white">
      <Grid container spacing={{ xs: 0.5, sm: 2 }}>
        {data.length === 0 && (
          <Typography variant="h3" mx="auto">
            No Product Found
          </Typography>
        )}
        {data.length !== 0 &&
          data.map((product) => (
            <Grid key={product.id} item xs={6} sm={4} md={3}>
              <WishlistProduct
                id={product.id}
                productId={product.productId}
                image={product.image}
                price={product.price}
                discount={product.discount}
                name={product.name}
                onDelete={setDeleteId}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Wishlist;
