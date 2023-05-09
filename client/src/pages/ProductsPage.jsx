import React, { useEffect, useState } from "react";
import Product from "../components/product/Product";
import { useLoaderData, useParams } from "react-router-dom";
import { Grid, Stack, Box, Drawer, Fab, Paper } from "@mui/material";
import FilterAlt from "@mui/icons-material/FilterAlt";
import Loader from "../components/general/Loader";
import FilterPanel from "../components/product/FilterPanel";
import NotFound from "../components/general/NotFound";
import InfiniteScroll from "react-infinite-scroll-component";
import { getData } from "../services/NodeService";

const ProductsPage = () => {
  const { category, subcategory, search } = useParams();
  const { products, filters: filtersData } = useLoaderData()
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
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

  const fetchProducts = async (filters) => {
    setLoading(true)
    const products = await getData("product", filters)
    setLoading(false)
    if (filters.pageNumber === 1) setItems(products)
    else setItems((items) => [...items, ...products])
    setHasMore(products.length >= 12)
  }

  const fetchMoreData = () => {
    setFilters((filters) => ({ ...filters, pageNumber: filters.pageNumber + 1 }));
    fetchProducts({ ...filters, pageNumber: filters.pageNumber + 1 })
  };

  const handleFilterChange = (newFilters) => {
    setFilters((filters) => ({
      ...filters,
      ...newFilters,
      pageNumber: 1,
    }));
    fetchProducts({
      ...filters,
      ...newFilters,
      pageNumber: 1,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  };

  useEffect(() => {
    setItems(products);
    setFilters((filters) => ({ ...filters, category, subcategory }))
    setHasMore(products.length >= 12)
    setLoading(false)
  }, [products]);

  return (
    <Box>
      {!loading && items.length === 0 ? (
        <NotFound message="No Product Found" />
      ) : (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 0, sm: 2 }}
          px={{ xs: 0, sm: 2 }}
        >
          <Stack
            width="20%"
            display={{ xs: "none", sm: "block" }}
            position="sticky"
            bottom={"100vh"}
          >
            <FilterPanel
              onChange={handleFilterChange}
              filterData={filtersData}
            />
          </Stack>
          <Box p={{ xs: 0, sm: 1 }}
            width={{ xs: "100%", sm: "80%" }}
            pr={{ xs: 0, sm: 2 }}>
            <Paper
              elevation={2}
            >
              {loading && filters.pageNumber === 1 ? (
                <Loader fullscreen />
              ) : (
                <InfiniteScroll
                  dataLength={items.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={<Loader height={100} />}
                >
                  <Grid
                    container
                    columnSpacing={{ xs: 1, sm: 2 }}
                    rowSpacing={{ xs: 0.5, sm: 2 }}
                    p={1}
                  >
                    <>
                      {items.map((product) => (
                        <Grid
                          key={product.id}
                          item
                          xs={6}
                          sm={3}
                          height={{ xs: 320, sm: 430 }}
                        >
                          <Product
                            id={product.id}
                            image={product.image}
                            price={product.price}
                            discount={product.discount}
                            name={product.name}
                            handler={product.handler}
                            wishlistId={product.wishlist[0]?.id ?? null}
                            badge="Trending"
                          />
                        </Grid>
                      ))}
                    </>
                  </Grid>
                </InfiniteScroll>
              )}
            </Paper>
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
                filterData={filtersData}
              />
            </Box>
          </Drawer>
        </Stack>
      )}
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
    </Box>
  );
}
export default ProductsPage;
