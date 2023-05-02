import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import useDataFetch from "../../hooks/useDataFetch";
import Loader from "../general/Loader";
import FallbackImage from "../../assets/image-placeholder.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

const STEP_INC = 0.202;

const CategoryRow = ({ category, showItems = null, title = null }) => {
  const { loading, data } = useDataFetch(
    "product/subcategory/" + category,
    [],
    null
  );
  const [activeStep, setActiveStep] = React.useState(0);

  const categories = showItems
    ? data.filter((item) => showItems.includes(item.name))
    : data;
  const steps = categories.length - 5;

  const handleStepChange = (step) => {
    if (activeStep === STEP_INC * steps) return;
    setActiveStep(step);
  };

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
      {loading && <Loader height={{ xs: 160, sm: 210 }} />}
      <Box height={200}>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          freeMode
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link
                href={`/category/${category.category}/${category.name}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Box>
                  <Box
                    component="img"
                    sx={{
                      display: "block",
                      overflow: "hidden",
                      width: { xs: 150, sm: 200 },
                      height: { xs: 150, sm: 200 },
                      objectFit: "contain",
                    }}
                    src={category.icon.concat("&width=200") || FallbackImage}
                    alt={category.name}
                  />
                  <Box
                    sx={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7))",
                    }}
                    position="absolute"
                    bottom={0}
                    width="100%"
                    py={1}
                  >
                    <Typography
                      textAlign="center"
                      fontWeight="medium"
                      fontSize={18}
                      color="white"
                      textTransform="uppercase"
                    >
                      {category.name}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default CategoryRow;
