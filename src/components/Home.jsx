import React, { Suspense } from "react";
import Banner from "./Banner";
import Product from "./Product/Product";
// import ProductImage from "../images/product.jpg";
import { getData } from "../Services/NodeService";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Grid, Skeleton } from "@mui/material";

const Home = () => {
  const { products } = useLoaderData();
  return (
    <>
      <Suspense
        fallback={<Skeleton variant="rectangular" width={210} height={60} />}
      >
        <Await
          resolve={products}
          errorElement={<p>Error loading package location!</p>}
        >
          {(resolvedData) => (
            <>
              <Banner />
              <Grid
                container
                rowSpacing={{ xs: 1, sm: 2 }}
                columnSpacing={{ xs: 1, sm: 6 }}
                p={{ xs: 1, sm: 2 }}
              >
                {resolvedData.map((product) => (
                  <Grid
                    key={product.id}
                    item
                    xs={6}
                    sm={3}
                    height={{ xs: 280, sm: 480 }}
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