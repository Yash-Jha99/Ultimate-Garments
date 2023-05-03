import React, { useEffect, useState } from "react";
import Product from "../components/product/Product";
import useDataFetch from "../hooks/useDataFetch";
import { useParams } from "react-router-dom";
import { Grid, Stack, Box, Drawer, Fab } from "@mui/material";
import FilterAlt from "@mui/icons-material/FilterAlt";
import Loader from "../components/general/Loader";
import FilterPanel from "../components/product/FilterPanel";
import NotFound from "../components/general/NotFound";
import InfiniteScroll from "react-infinite-scroll-component";
import { randomBadge } from "../utils/utils";

const ProductsPage = () => {
  const { category, subcategory, search } = useParams();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    search,
    category,
    subcategory,
    pageSize: 12,
    pageNumber: 1,
    size: "",
    color: "",
    price: ""
  });
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(!openDrawer);
  };

  const { loading } = useDataFetch(
    "product",
    null,
    (data) => {
      if (filters.pageNumber === 1) setItems(data);
      else setItems((items) => [...items, ...data]);
      setHasMore(data.length >= 12);
    },
    filters,
    [filters]
  );

  const fetchData = () => {
    setFilters((filters) => ({ ...filters, pageNumber: filters.pageNumber + 1 }));
  };

  const handleFilterChange = (filters) => {
    setFilters((prevfilters) => ({
      ...prevfilters,
      ...filters,
      pageNumber: 1,
    }));
    window.scrollTo({ top: 0, behavior: "auto" })
  };

  useEffect(() => {
    setFilters((filters) => ({
      ...filters,
      pageNumber: 1,
      category: category,
      subcategory: subcategory,
    }));
  }, [category, subcategory]);

  if (items.length === 0 && !loading)
    return <NotFound message="No Product Found" />;

  return (
    <>
      <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }} px={{ xs: 0, sm: 2 }}>
        <Stack
          width="20%"
          display={{ xs: "none", sm: "block" }}
          position="sticky"
          bottom={"100vh"}
        >
          <FilterPanel
            onChange={handleFilterChange}
            subcategory={subcategory}
            category={category}
          />
        </Stack>
        <Box
          bgcolor="white"
          boxShadow={2}
          p={1}
          width={{ xs: "98%", sm: "80%" }}
          pr={{ xs: 0.5, sm: 2 }}
        >
          <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<Loader height={100} />}
          >
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 2 }}
              rowSpacing={{ xs: 0.5, sm: 2 }}
              p={1}
            >
              {loading && filters.pageNumber === 1 ? (
                <Loader fullscreen />
              ) : (
                items.map((product, index) => (
                  <Grid
                    key={product.id}
                    item
                    xs={6}
                    sm={3}
                    height={{ xs: 280, sm: 430 }}
                  >
                    <Product
                      id={product.id}
                      image={product.image}
                      price={product.price}
                      discount={product.discount}
                      name={product.name}
                      handler={product.handler}
                      wishlistId={product.wishlistId}
                      badge={randomBadge(index)}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </InfiniteScroll>
        </Box>
        <Drawer
          anchor={"left"}
          open={openDrawer}
          onClose={toggleDrawer("left", false)}
        >
          <Box
            sx={{
              width: 250,
            }}
            role="presentation"
          >
            <FilterPanel
              onChange={handleFilterChange}
              subcategory={subcategory}
              category={category}
            />
          </Box>
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

export default ProductsPage;
