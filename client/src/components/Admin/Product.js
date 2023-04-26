import useStyles from "./ProductCss";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Button,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getData, postData } from "../../services/NodeService";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(option, options, theme) {
  return {
    fontWeight:
      options.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
  };
}

const Product = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [image, setImage] = useState({ url: "", bytes: "" });

  const theme = useTheme();

  const getCategories = async () => {
    const result = await getData("product/category");
    if (result.result) {
      setCategories(
        result.result.map((item) => ({ text: item.name, value: item.id }))
      );
    }
  };

  const getSubCategories = async (id) => {
    const result = await getData(`product/subcategory/${id}`);
    console.log(result.result);
    if (result.result) {
      setSubCategories(
        result.result.map((item) => ({ text: item.name, value: item.id }))
      );
    }
  };
  const getSizes = async () => {
    const result = await getData(`product/options/sizes`);
    if (result) {
      setSizes(result);
    }
  };
  const getColors = async () => {
    const result = await getData(`product/options/colors`);
    if (result) {
      setColors(result);
    }
  };

  const handleIcon = (e) => {
    console.log(e.target.files[0]);
    setImage({
      url: URL.createObjectURL(e.target.files[0]),
      bytes: e.target.files[0],
    });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    getSubCategories(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(image.bytes);
    const formData = new FormData();
    formData.append("name", productName);
    // for (let i of image.bytes) {
    formData.append("image", image.bytes);
    // }

    formData.append("category", category);
    formData.append("subcategory", subCategory);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("description", description);
    formData.append("rating", rating);
    formData.append("sizes", selectedSizes);
    formData.append("colors", selectedColors);

    const result = await postData("admin/product", formData, true);
    alert(result.result);
  };

  const handleReset = () => {
    setProductName("");
    setImage({ url: "", image: "" });
    setCategory("");
  };

  useEffect(() => {
    getCategories();
    getColors();
    getSizes();
  }, []);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.headingText}>
            Product Interface
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="select-label-category">Category</InputLabel>
              <Select
                label="Category"
                labelId="select-label"
                value={category}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="select-label-subcategory">SubCategory</InputLabel>
              <Select
                label="SubCategory"
                labelId="select-label"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                {subCategories.map((subCategory) => (
                  <MenuItem key={subCategory.value} value={subCategory.value}>
                    {subCategory.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={productName}
              variant="outlined"
              label="Product Name"
              onChange={(e) => setProductName(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              type="number"
              value={price}
              variant="outlined"
              label="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type="number"
              value={discount}
              variant="outlined"
              label="Discount"
              onChange={(e) => setDiscount(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              multiline
              maxRows={3}
              minRows={3}
              value={description}
              variant="outlined"
              label="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              value={rating}
              variant="outlined"
              label="Rating"
              onChange={(e) => setRating(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="select-label-sizes">Sizes</InputLabel>
              <Select
                MenuProps={MenuProps}
                multiple
                label="sizes"
                labelId="select-label"
                value={selectedSizes}
                onChange={(e) => setSelectedSizes(e.target.value)}
              >
                {sizes.map((size) => (
                  <MenuItem
                    style={getStyles(size.id, selectedSizes, theme)}
                    key={size.id}
                    value={size.id}
                  >
                    {size.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="select-label-colors">Colors</InputLabel>
              <Select
                MenuProps={MenuProps}
                multiple
                label="colors"
                labelId="select-label"
                value={selectedColors}
                onChange={(e) => setSelectedColors(e.target.value)}
              >
                {colors.map((color) => (
                  <MenuItem
                    style={getStyles(color.id, selectedColors, theme)}
                    sx={{ textTransform: "capitalize" }}
                    key={color.id}
                    value={color.id}
                  >
                    {color.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={6}>
            <Button fullWidth component="label" variant="contained">
              Upload
              <input
                hidden
                accept="image/*"
                onChange={handleIcon}
                name="image"
                type="file"
              />
            </Button>
          </Grid>
          <Grid
            container
            item
            xs={6}
            flexDirection="row"
            justifyContent="center"
          >
            <Avatar
              alt="Icon"
              src={image.url}
              variant="rounded"
              sx={{
                width: 80,
                height: 80,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Product;
