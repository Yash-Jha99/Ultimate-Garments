import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import FallbackImage from "../../assets/image-placeholder.png";
import useDataFetch from "../../hooks/useDataFetch";
import Loader from "../general/Loader";

const CategoryRow = ({ category, showItems = null, title = null }) => {
  const { loading, data } = useDataFetch(
    "product/subcategory/" + category,
    [],
    null
  );

  const subcategories = showItems
    ? data.filter((item) => showItems.includes(item.name))
    : data;

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
          {subcategories.map((subcategory) => (
            <SwiperSlide key={subcategory.id}>
              <Link
                to={`/products/${category}/${subcategory.name}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Box>
                  <Box
                    component="img"
                    loading="lazy"
                    sx={{
                      display: "block",
                      overflow: "hidden",
                      width: { xs: 150, sm: 200 },
                      height: { xs: 150, sm: 200 },
                      objectFit: "contain",
                    }}
                    src={subcategory.icon.concat("&width=200") || FallbackImage}
                    alt={subcategory.name}
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
                      {subcategory.name}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Paper>
  );
};

export default CategoryRow;
