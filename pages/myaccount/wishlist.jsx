import React, { useEffect, useState } from "react";
import WishlistProduct from "../../components/product/WishlistProduct";
import { Grid, Box } from "@mui/material";
import useDataFetch from "../../hooks/useDataFetch";
import Loader from "../../components/general/Loader";
import NotFound from "../../components/general/NotFound";
import MyAccount from "@/components/layouts/MyAccount";
import wrapper from "@/store/store";

const Wishlist = () => {
  const { data, loading, setData } = useDataFetch("wishlist", []);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    if (deleteId) {
      setData((data) => data.filter((wishlist) => wishlist.id !== deleteId));
    }
  }, [deleteId, setData]);

  return (
    <MyAccount>
      <Box boxShadow={2} p={2} bgcolor="white">
        {loading && <Loader />}
        {!loading && data.length === 0 && (
          <NotFound message="Your wishlist is empty" />
        )}
        <Grid container spacing={{ xs: 0.5, sm: 2 }}>
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
    </MyAccount>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ res, req }) => {
      const { token } = store.getState().auth;
      if (!token) {
        res.setHeader("Location", "/login?from=" + req.url);
        res.statusCode = 302;
        res.end();
      }
      return { props: {} };
    }
);

export default Wishlist;
