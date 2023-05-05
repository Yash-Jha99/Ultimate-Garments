import { Box, Card, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import useDataFetch from "../../hooks/useDataFetch";
import Loader from "../general/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";

const ProductRow = ({ category, title = null }) => {
  const [params] = useState({ category });
  const { loading, data: products } = useDataFetch("product", [], null, params);
  return (
    <Paper sx={{ p: 1 }} elevation={2}>
      <Typography
        px={2}
        py={1}
        mb={1}
        borderBottom="1px solid lightgray"
        variant="h5"
      >
        {title}
      </Typography>
      {loading && <Loader height={{ xs: 270, sm: 310 }} />}
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link
              to={`/${product.handler}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card>
                <Stack
                  width={{ xs: 160, sm: 240 }}
                  pb={1}
                  height="100%"
                  justifyContent="center"
                >
                  <Box
                    component="img"
                    sx={{
                      display: "block",
                      overflow: "hidden",
                      width: "100%",
                      maxHeight: { xs: 200, sm: 310 },
                      minHeight: { xs: 200, sm: 310 },
                      objectFit: "contain",
                    }}
                    src={product.image}
                    alt={product.name}
                  />
                  <Box
                    mx={1}
                    width="90%"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    textAlign="center"
                  >
                    <Typography
                      pt={2}
                      fontWeight="bold"
                      variant="caption"
                      color="text.light"
                    >
                      {product.name}
                    </Typography>
                    <Typography fontWeight="bold" variant="subtitle1">
                      ₹{product.price}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Paper>
  );
};

export default ProductRow;
