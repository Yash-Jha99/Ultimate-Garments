import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Close, ShoppingBagOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/reducers/cart";
import { deleteData, getData } from "../../services/NodeService";

const AddToCartDialog = ({ productId, open, handleClose, onAddToCart }) => {
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const sizeProductOptionId = sizes.find(
      (size) => size.id === selectedSize
    ).productOptionId;
    const colorProductOptionId = colors.find(
      (color) => color.id === selectedColor
    ).productOptionId;
    if (sizeProductOptionId !== colorProductOptionId)
      return alert("This size-color combination not available");

    dispatch(
      addToCart({
        productId,
        quantity,
        productOptionId: sizeProductOptionId,
      })
    );
    onAddToCart();
    handleClose();
  };

  useEffect(() => {
    const getSizes = async () => {
      const result = await getData(`product/${productId}/size`);
      if (result) {
        setSizes(result);
      }
    };
    const getColors = async () => {
      const result = await getData(`product/${productId}/color`);
      if (result) {
        setColors(result);
      }
    };
    if (open) {
      getColors();
      getSizes();
    }
  }, [open, productId]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent sx={{ p: { xs: 4, sm: 6 } }}>
        <Grid container rowSpacing={{ xs: 3, sm: 6 }} columnSpacing={2}>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel
                color="secondary"
                size="small"
                id="select-label-sizes"
              >
                Size
              </InputLabel>
              <Select
                color="secondary"
                size="small"
                label="sizes"
                labelId="select-label-sizes"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {sizes.map((size) => (
                  <MenuItem
                    sx={{ textTransform: "uppercase" }}
                    key={size.productOptionId}
                    value={size.id}
                  >
                    {size.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel
                color="secondary"
                size="small"
                id="select-label-colors"
              >
                Color
              </InputLabel>
              <Select
                color="secondary"
                size="small"
                label="colors"
                labelId="select-label"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {colors.map((color) => (
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    key={color.productOptionId}
                    value={color.id}
                  >
                    {color.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel
                color="secondary"
                size="small"
                id="select-label-colors"
              >
                Quantity
              </InputLabel>
              <Select
                size="small"
                color="secondary"
                label="Quantity"
                labelId="select-label-colors"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          sx={{ mt: { xs: 2, sm: 5 } }}
          onClick={handleAddToCart}
          variant="contained"
          color="secondary"
        >
          Add To Cart
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const WishlistProduct = ({
  id,
  wishlistId,
  productId,
  image,
  price,
  name,
  discount,
  onDelete,
  badge = "",
}) => {
  const [notify, setNotify] = useState({ open: false, message: "" });
  const [open, setOpen] = useState(false);

  const handleClick = async (e) => {
    if (e) e.preventDefault();
    const response = await deleteData("wishlist/" + id);
    if (response.status === 200) {
      setNotify({ open: true, message: "Product removed from wishlist" });
      onDelete(id);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({ open: false, message: "" });
  };

  const handleDialogClose = async () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        color: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        width: { xs: 130, sm: 200 },
        mx: "auto",
      }}
    >
      <Link
        to={`/${name.replace(/\s+/g, "-")}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Box
          width={{ xs: 130, sm: 200 }}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          textAlign="center"
          px={1}
        >
          {badge && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bgcolor: "error.main",
                p: "2px 8px",
                fontSize: 16,
                fontWeight: "normal",
                color: "white",
              }}
            >
              {badge}
            </Box>
          )}

          <IconButton
            disableRipple
            onClick={handleClick}
            sx={{
              width: "32px",
              height: "32px",
              color: "black",
              bgcolor: "white",
              position: "absolute",
              opacity: 0.6,
              right: "8px",
              top: "8px",
              ":hover": {
                bgcolor: "white",
              },
            }}
          >
            <Close />
          </IconButton>
          <img
            src={image}
            style={{
              objectFit: "contain",
              height: 170,
              maxWidth: 170,
              display: "block",
              margin: "0 auto",
            }}
            alt="product"
            width="100%"
          />
          <Typography
            mt={1}
            fontWeight="bold"
            variant="caption"
            color="text.light"
          >
            {name}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            columnGap={{ xs: 0.5, sm: 1 }}
            pb={1}
          >
            <Typography
              fontWeight="bold"
              fontSize={{ xs: 12, sm: 18 }}
              color="error.light"
            >
              ₹{price}
            </Typography>
            <Typography
              sx={{ textDecoration: "line-through" }}
              fontSize={{ xs: 12, sm: 18 }}
              color="text.main"
            >
              ₹{Math.ceil(price * (1 + discount / 100))}
            </Typography>
            <Typography fontSize={{ xs: 12, sm: 18 }} color="success.light">
              ({discount}% off)
            </Typography>
          </Box>
        </Box>
      </Link>
      <Button
        sx={{
          maxWidth: "250px",
          bgcolor: "gray",
          fontSize: { xs: 12, sm: 16 },
        }}
        fullWidth
        size="small"
        variant="contained"
        startIcon={<ShoppingBagOutlined />}
        onClick={async () => {
          setOpen(true);
        }}
      >
        ADD TO CART
      </Button>
      <Snackbar
        open={notify.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
          elevation={2}
        >
          {notify.message}
        </Alert>
      </Snackbar>
      <AddToCartDialog
        open={open}
        handleClose={handleDialogClose}
        productId={productId}
        onAddToCart={handleClick}
      />
    </Box>
  );
};

export default WishlistProduct;
