import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import {
  Box,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCart } from "../../store/reducers/cart";
import { NavLink } from "react-router-dom";
import { postData } from "../../services/NodeService";
import { useSnackbar } from "notistack";
import Loader from "../general/Loader";

const CartItem = ({
  id,
  productId,
  image,
  name,
  price,
  qty = 1,
  size = "L",
  color = "red",
  discount = 25,
  quantityInStock,
  handler,
}) => {
  const [quantity, setQuantity] = useState(qty);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleMoveToWishlist = async () => {
    dispatch(removeFromCart({ id }));
    const response = await postData("wishlist", {
      productId,
    });
    if (response.status === 201) {
      // setNotify({ open: true, message: "Product Wishlisted" });
    }
  };

  const outOfStock = quantityInStock === 0;

  return (
    <Paper sx={{ ":hover": { boxShadow: 2 }, p: 2 }}>
      <Stack direction="row" spacing={2} pb={{ xs: 1, sm: 1 }}>
        <Stack alignItems="center">
          <NavLink
            style={{ textDecoration: "none", display: "block" }}
            to={`/${handler}?size=${size}&color=${color}`}
          >
            <Box
              height={{ xs: 72, sm: 120 }}
              width={{ xs: 72, sm: 120 }}
              mx={{ xs: 0, sm: 2 }}
            >
              <img
                src={image}
                alt="product"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </NavLink>
          <Box sx={{ minWidth: 80 }} mt={2}>
            <FormControl fullWidth size="small">
              <InputLabel
                color="secondary"
                size="small"
                id="select-label-quantity"
              >
                Quantity
              </InputLabel>
              <Select
                color="secondary"
                id="demo-simple-select"
                labelId="select-label-quantity"
                label="quantity"
                value={quantity}
                onChange={(e) => {
                  if (e.target.value > quantityInStock)
                    return enqueueSnackbar("Please select less quantity", {
                      variant: "info",
                    });
                  setQuantity(e.target.value);
                  dispatch(updateCart({ id, quantity: e.target.value }));
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <Stack width="100%" overflow="hidden" textOverflow="ellipsis">
          <Typography variant="body2">{name}</Typography>
          <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
            <Typography fontWeight="bold" variant="h6">
              ₹ {price}
            </Typography>
            <Typography
              sx={{ textDecoration: "line-through" }}
              variant="subtitle1"
              color="text.secondary"
            >
              ₹ {Math.ceil(price * (1 + discount / 100))}
            </Typography>
            <Typography variant="body1" color="success.light">
              ({discount}% off)
            </Typography>
          </Stack>
          <Grid container py={{ xs: 1, sm: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body2">
                <b>Color : </b>
                {color}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <b>Size : </b>
                {size}
              </Typography>
            </Grid>
          </Grid>
          {outOfStock && (
            <Typography
              pt={2}
              variant="h5"
              fontWeight="medium"
              color="error.light"
            >
              Out of Stock
            </Typography>
          )}
        </Stack>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        justifyContent="space-around"
        px={{ xs: 2, sm: 4 }}
        mb={-2}
      >
        <Button
          sx={{
            textTransform: "none",
            color: "text.secondary",
            ":hover": { bgcolor: "inherit" },
          }}
          disableRipple
          onClick={() => {
            dispatch(removeFromCart({ id }));
          }}
        >
          Remove
        </Button>
        <Button
          disableRipple
          sx={{
            textTransform: "none",
            color: "text.secondary",
            ":hover": { bgcolor: "inherit" },
          }}
          onClick={handleMoveToWishlist}
        >
          Move to wishlist
        </Button>
      </Stack>
    </Paper>
  );
};

const Cart = () => {
  const { items: cart, loading } = useSelector((state) => state.cart);
  return (
    <Stack spacing={{ xs: 1, sm: 2 }}>
      {loading && <Loader />}
      {cart.map((cart) => (
        <CartItem
          key={cart.id}
          id={cart.id}
          productId={cart.product.id}
          image={cart.product.image}
          price={cart.product.price}
          name={cart.product.name}
          qty={cart.quantity}
          discount={cart.product.discount}
          color={cart.option.color}
          size={cart.option.size}
          quantityInStock={cart.option.stock}
          handler={cart.product.handler}
        />
      ))}
    </Stack>
  );
};

export default Cart;
