import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Box } from "@mui/material";

const Banner = ({ images }) => {
  return (
    <Box height={{ xs: 320, sm: 460 }}>
      <Swiper
        spaceBetween={0}
        loop
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {images.map(({ image, label }) => (
          <SwiperSlide key={label}>
            <img
              src={image}
              alt="label"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Banner;
