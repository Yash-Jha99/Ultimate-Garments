import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useDataFetch from "../../hooks/useDataFetch";
import Loader from "../general/Loader";
import NotFound from "../general/NotFound";
import WishlistProduct from "../product/WishlistProduct";

const Wishlist = () => {
  const { data, loading, setData } = useDataFetch("wishlist", []);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    if (deleteId) {
      setData((data) => data.filter((wishlist) => wishlist.id !== deleteId));
    }
  }, [deleteId, setData]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : data.length === 0 ? (
        <NotFound message="Your wishlist is empty" />
      ) : (
        <Paper sx={{ p: 2, minHeight: "81vh" }} elevation={2}>
          <Stack>
            <Typography variant="h5" mb={1}>
              My Wishlist
            </Typography>
            <Divider />
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
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default Wishlist;
