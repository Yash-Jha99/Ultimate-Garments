import React, { useMemo, useState } from "react";
import Product from "./Product/Product";
import useDataFetch from "../hooks/useDataFetch";
import { useParams } from "react-router-dom";
import {
  Grid,
  Stack,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Box,
  Drawer,
  Fab,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CheckCircle, Circle, FilterAlt } from "@mui/icons-material";
import Loader from "./General/Loader";

const Category = () => {
  const { categoryName, search } = useParams();
  const [data, setData] = useState([]);
  const [sizeFilters, setSizeFilters] = useState([]);
  const [colorFilters, setColorFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState(null);
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

  const { error1 } = useDataFetch("product/options/size", [], (data) => {
    setSizeFilters(data.map((size) => ({ ...size, active: false })));
  });

  const { error2 } = useDataFetch("product/options/color", [], (data) => {
    setColorFilters(data.map((color) => ({ ...color, active: false })));
  });

  const filters = useMemo(
    () => ({
      size:
        sizeFilters
          .filter((size) => size.active)
          .map((size) => size.name)
          .join("+") || null,

      color:
        colorFilters
          .filter((color) => color.active)
          .map((color) => color.name)
          .join("+") || null,

      category: categoryName?.replace(/-/g, " "),
      search,
    }),
    [sizeFilters, colorFilters, categoryName, search]
  );

  const { error, loading } = useDataFetch(
    "product",
    [],
    (products) => setData(products),
    filters
  );

  if (error || error1 || error2) return null;

  // if (loading && data === undefined) return <Loader />;

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSizeFilters(
      sizeFilters.map((size) =>
        size.name === name ? { ...size, active: checked } : size
      )
    );
  };

  const handleColorChange = (event) => {
    const { name, checked } = event.target;
    setColorFilters(
      colorFilters.map((color) =>
        color.value === name ? { ...color, active: checked } : color
      )
    );
  };
  const handlePriceChange = (event) => {
    setPriceFilters(event.target.value);
    if (event.target.value === "low to high") {
      setData(data.sort((a, b) => a.price - b.price));
    } else setData(data.sort((a, b) => b.price - a.price));
  };

  const filterPanel = (
    <>
      <Typography p={2} variant="h6" borderBottom="1px solid lightgray">
        FILTER
      </Typography>
      <Accordion expanded elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>SIZE</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            {sizeFilters.map(({ id, name, active }) => (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    checked={active}
                    onChange={handleChange}
                    name={name}
                  />
                }
                label={name.toUpperCase()}
              />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>COLOR</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {colorFilters.map(({ id, value, active }) => (
            <Checkbox
              key={id}
              size="small"
              color="secondary"
              checked={active}
              onChange={handleColorChange}
              name={value}
              icon={<Circle sx={{ fontSize: 36, color: value }} />}
              checkedIcon={<CheckCircle sx={{ fontSize: 36, color: value }} />}
            />
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion expanded elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>PRICE</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={priceFilters}
              onChange={handlePriceChange}
            >
              <FormControlLabel
                value="low to high"
                control={<Radio size="small" color="secondary" />}
                label="Price : Low to High"
              />
              <FormControlLabel
                value="high to low"
                control={<Radio size="small" color="secondary" />}
                label="Price : High to Low"
              />
            </RadioGroup>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      {filterPanel}
    </Box>
  );

  // useEffect(() => {
  //   getProducts();
  // }, [sizeFilters, colorFilters, categoryName]);

  // useEffect(() => {
  //   getFilters();
  // }, []);

  return (
    <>
      {loading && <Loader />}
      <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }} mx={{ xs: 0, sm: 1 }}>
        <Stack
          width="20%"
          bgcolor="white"
          display={{ xs: "none", sm: "block" }}
        >
          {filterPanel}
        </Stack>
        <Grid
          width={{ xs: "98%", sm: "80%" }}
          container
          columnSpacing={{ xs: 1, sm: 2 }}
          rowSpacing={{ xs: 0.5, sm: 2 }}
          pr={{ xs: 0.5, sm: 2 }}
          bgcolor="white"
        >
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
