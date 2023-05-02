import React, { useEffect, useRef, useState } from "react";
import Product from "../../../components/Product/Product";
import useDataFetch from "../../../hooks/useDataFetch";
import { Grid, Stack, Box, Drawer, Fab } from "@mui/material";
import FilterAlt from "@mui/icons-material/FilterAlt";
import Loader from "../../../components/general/Loader";
import FilterPanel from "../../../components/product/FilterPanel";
import NotFound from "../../../components/general/NotFound";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";
import Layout from "@/components/layouts/Layout";
import { getData } from "@/services/NodeService";

const ProductsPage = ({ products, filters: filtersData }) => {
  const router = useRouter();
  const { category, subcategory, search } = router.query;
  const [items, setItems] = useState([]);
  const pageRef = useRef(null)
  const [filters, setFilters] = useState({
    search,
    pageSize: 12,
    category,
    subcategory,
    pageNumber: 1
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


  const { loading, hasMore, setHasMore } = useDataFetch(
    "product",
    null,
    (data) => {
      if (filters.pageNumber === 1) setItems(data)
      else setItems((items) => [...items, ...data])
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
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    setItems(products);
    setHasMore(products.length >= 12)
  }, [products]);

  return (
    <div ref={pageRef}>
      <Layout>
        {!loading && items.length === 0 ? (
          <NotFound message="No Product Found" />
        ) : (
          <Stack
            direction="row"
            spacing={{ xs: 0.5, sm: 2 }}
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
                filters={filtersData}
              />
            </Stack>
            <Box
              bgcolor="white"
              boxShadow={2}
              p={1}
              width={{ xs: "98%", sm: "80%" }}
              pr={{ xs: 0.5, sm: 2 }}
            >
              {loading && filters.pageNumber === 1 ? (
                <Loader fullscreen />
              ) : (
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
                    <>
                      {items.map((product) => (
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
                            badge="Trending"
                          />
                        </Grid>
                      ))}
                    </>
                  </Grid>
                </InfiniteScroll>
              )}
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
                  filters={filtersData}
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
      </Layout>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, params }) => {
  const response = await Promise.all(["product", `product/options/size`, `product/options/color`].map(url => getData(url, { ...params, pageSize: 12 })))
  return { props: { products: response[0], filters: { size: response[1], color: response[2] } } }
}

export default ProductsPage;
