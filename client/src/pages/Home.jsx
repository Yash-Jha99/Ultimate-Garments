import React, { Suspense } from "react";
import Banner from "../components/home/Banner";
import { getData } from "../services/NodeService";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Box } from "@mui/material";
import Loader from "../components/general/Loader";
import Error from "../components/general/Error";
import ProductRow from "../components/home/ProductRow";

const images = [
  {
    label: "banner-1",
    image:
      "https://firebasestorage.googleapis.com/v0/b/my-project-e6483.appspot.com/o/images%2Fbanner%2Fbanner-1.jpg?alt=media&token=8e32bb5c-07c2-4dd2-9552-cb03d2289ea9",
  },
  {
    label: "banner-2",
    image:
      "https://firebasestorage.googleapis.com/v0/b/my-project-e6483.appspot.com/o/images%2Fbanner%2Fbanner-2.jpg?alt=media&token=d5213681-39c3-4809-99aa-b13fb59701ba",
  },
];

const Home = () => {
  const { products } = useLoaderData();

  return (
    <>
      <Banner images={images} />
      <Suspense fallback={<Loader fullscreen />}>
        <Await resolve={products} errorElement={Error}>
          {(resolvedData) => (
            <Box px={6}>
              <ProductRow products={resolvedData} />
            </Box>
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
