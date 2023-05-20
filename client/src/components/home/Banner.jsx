import { Box } from "@mui/material";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import FallbackImage from "../../assets/image-placeholder.png";

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
              src={FallbackImage}
              alt="label"
              loading="lazy"
              style={{ objectFit: "contain" }}
              onLoad={(e) => (e.target.src = image)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Banner;
