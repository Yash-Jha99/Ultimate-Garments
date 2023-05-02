import { useTheme } from "@emotion/react";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import useDataFetch from "../../hooks/useDataFetch";
import Loader from "../general/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Navigation } from "swiper";

const ProductRow = ({ category, title = null }) => {
  const [params] = useState({ category });
  const { loading, data: products } = useDataFetch("product", [], null, params);
  return (
    <Box position="relative" bgcolor="white" py={1} boxShadow={2}>
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
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link
              href={`/${product.handler}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Stack
                justifyContent="center"
                width={{ xs: 160, sm: 240 }}
                bgcolor="white"
              >
                <Box
                  component="img"
                  sx={{
                    display: "block",
                    overflow: "hidden",
                    width: "100%",
                    height: { xs: 200, sm: 260 },
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
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <IconButton
        sx={{
          display: { xs: "none", sm: "flex" },
          position: "absolute",
          borderRadius: 0,
          zIndex: 10,
          width: 40,
          height: 70,
          border: "1px solid gray",
          ":hover": { bgcolor: "white" },
          bgcolor: "white",
          top: "42%",
          right: 0,
          visibility:
            activeStep === STEP_INC * steps || steps <= 0
              ? "hidden"
              : "visible",
        }}
        onClick={handleNext}
        disabled={activeStep === STEP_INC * steps}
      >
        <KeyboardArrowRight fontSize="large" />
      </IconButton>
      <IconButton
        sx={{
          display: { xs: "none", sm: "flex" },
          position: "absolute",
          borderRadius: 0,
          zIndex: 10,
          width: 40,
          height: 70,
          border: "1px solid gray",
          ":hover": { bgcolor: "white" },
          bgcolor: "white",
          top: "42%",
          left: 0,
          visibility: activeStep <= 0 ? "hidden" : "visible",
        }}
        onClick={handleBack}
        disabled={activeStep <= 0}
      >
        <KeyboardArrowLeft fontSize="large" />
      </IconButton> */}
    </Box>
  );
};

export default ProductRow;
