import useStyles from "./CategoryCss";
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
import { getData, postData } from "../../services/NodeService";

const SubCategory = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [icon, setIcon] = useState({ url: "", bytes: "" });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const result = await getData("product/category");
    if (result.result) {
      setCategories(
        result.result.map((item) => ({ text: item.name, value: item.id }))
      );
    }
  };

  const handleIcon = (e) => {
    setIcon({
      url: URL.createObjectURL(e.target.files[0]),
      bytes: e.target.files[0],
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("subcategory", subCategoryName);
    formData.append("icon", icon.bytes);
    formData.append("categoryid", category);
    const result = await postData("admin/subcategory", formData, true);
    alert(result.result);
    setSubCategoryName("");
    setIcon({ url: "", icon: "" });
    setCategory("");
  };

  const handleReset = () => {
    setSubCategoryName("");
    setIcon({ url: "", icon: "" });
    setCategory("");
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container rowGap={2} columnSpacing={2}>
          <Grid item xs={12} className={classes.headingText}>
            SubCategory Interface
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Category</InputLabel>
              <Select
                label="Category"
                labelId="select-label"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              value={subCategoryName}
              variant="outlined"
              label="SubCategory Name"
              onChange={(e) => setSubCategoryName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth component="label" variant="contained">
              Upload
              <input
                hidden
                accept="image/*"
                onChange={handleIcon}
                name="icon"
                multiple
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
              src={icon.url}
              variant="rounded"
              sx={{
                width: 56,
                height: 56,
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

export default SubCategory;
