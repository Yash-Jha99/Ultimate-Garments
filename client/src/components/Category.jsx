import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
import useDataFetch from "../hooks/useDataFetch";
import { useParams } from "react-router-dom";
import { Grid, Stack, Box, Drawer, Fab } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import Loader from "./General/Loader";
import FilterPanel from "./Product/FilterPanel";
import NotFound from "./General/NotFound";

const Category = () => {
  const { categoryName, search } = useParams();
  const [filters, setFilters] = useState({
    search,
    category: categoryName?.replace(/-/g, " "),
  });
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(!openDrawer);
  };

  const { error, loading, data } = useDataFetch("product", [], null, filters);

  useEffect(() => {
    setFilters((filters) => ({
      ...filters,
      category: categoryName?.replace(/-/g, " "),
    }));
  }, [categoryName]);

  if (error?.status === 404) return <NotFound message="No Product Found" />;

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <FilterPanel onChange={setFilters} />
    </Box>
  );

  return (
    <>
      <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }} mx={{ xs: 0, sm: 1 }}>
        <Stack
          width="20%"
          bgcolor="white"
          display={{ xs: "none", sm: "block" }}
        >
          <FilterPanel onChange={setFilters} />
        </Stack>
        <Grid
          width={{ xs: "98%", sm: "80%" }}
          container
          columnSpacing={{ xs: 1, sm: 2 }}
          rowSpacing={{ xs: 0.5, sm: 2 }}
          pr={{ xs: 0.5, sm: 2 }}
          bgcolor="white"
        >
          {loading && <Loader />}
          {data.map((product) => (
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
        <Drawer
          anchor={"left"}
          open={openDrawer}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </Stack>
      <Fab
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "fixed",
          bottom: 24,
          left: 24,
        }}
        size="medium"
        color="secondary"
        onClick={toggleDrawer("left", true)}
      >
        <FilterAlt />
      </Fab>
    </>
  );
};

export default Category;
