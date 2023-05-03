import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import WishlistProduct from "../product/WishlistProduct";
import { Divider, Grid, Typography } from "@mui/material";
import useDataFetch from "../../hooks/useDataFetch";
import Loader from "../general/Loader";
import NotFound from "../general/NotFound";

const Wishlist = () => {
  const { data, loading, setData } = useDataFetch("wishlist", []);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    if (deleteId) {
      setData((data) => data.filter((wishlist) => wishlist.id !== deleteId));
    }
  }, [deleteId, setData]);

  if (loading) return <Loader />;

  return (
    <Box boxShadow={2} p={2} bgcolor="white" minHeight="81vh">
      <Typography variant="h5" mb={1}>My Wishlist</Typography>
      <Divider />
      {loading && <Loader />}
      {!loading && data.length === 0 && (
        <NotFound message="Your wishlist is empty" />
      )}
      <Grid container spacing={{ xs: 0.5, sm: 2 }} pt={2}>
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
                handler={product.handler}
                onDelete={setDeleteId}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Wishlist;
