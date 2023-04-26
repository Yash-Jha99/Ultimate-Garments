import React, { Suspense } from "react";
import Banner from "../components/home/Banner";
import Product from "../components/product/Product";
import { getData } from "../services/NodeService";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Grid } from "@mui/material";
import Loader from "../components/general/Loader";
import Error from "../components/general/Error";

const Home = () => {
  const { products } = useLoaderData();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Await resolve={products} errorElement={Error}>
          {(resolvedData) => (
            <>
              <Banner />
              <Grid
                container
                rowSpacing={{ xs: 1, sm: 2 }}
                columnSpacing={{ xs: 1, sm: 4 }}
                p={{ xs: 1, sm: 2 }}
              >
                {resolvedData.map((product) => (
                  <Grid
                    key={product.id}
                    item
                    xs={6}
                    sm={3}
                    height={{ xs: 280, sm: 380 }}
                  >
                    <Product
                      id={product.id}
                      image={product.image}
                      price={product.price}
                      discount={product.discount}
                      name={product.name}
                      wishlistId={product.wishlistId}
                      badge="Trending"
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export const loader = async () => {
  const response = getData("product");
  return defer({ products: response });
};

export default Home;
