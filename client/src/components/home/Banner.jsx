import { Box } from "@mui/material";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "../general/Image";

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
            <Box height={450}>
              <Image
                src={image}
                alt="label"
                height={450}
                style={{ objectFit: "contain" }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Banner;
