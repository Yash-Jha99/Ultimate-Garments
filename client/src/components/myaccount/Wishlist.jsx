import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import WishlistProduct from "../product/WishlistProduct";
import { Divider, Grid, Paper, Typography } from "@mui/material";
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
    <Paper sx={{ p: 2, minHeight: "81vh" }} elevation={2}>
      <Typography variant="h5" mb={1}>My Wishlist</Typography>
      <Divider />
      {loading && <Loader />}
      {!loading && data.length === 0 && (
        <NotFound message="Your wishlist is empty" />
      )}
      <Grid container spacing={{ xs: 0.5, sm: 2 }} pt={2}>
        {data.length !== 0 &&
          data.map((item) => (
            <Grid key={item.id} item xs={6} sm={4} md={3}>
              <WishlistProduct
                id={item.id}
                productId={item.product.id}
                image={item.product.image}
                price={item.product.price}
                discount={item.product.discount}
                name={item.product.name}
                handler={item.product.handler}
                onDelete={setDeleteId}
              />
            </Grid>
          ))}
      </Grid>
    </Paper>
  );
};

export default Wishlist;
