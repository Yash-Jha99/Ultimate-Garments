import { Button, Grid, Typography } from "@mui/material";
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
import { postData } from "../../Services/NodeService";

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
}) => {
  const [quantity, setQuantity] = useState(qty);
  const dispatch = useDispatch();

  const handleMoveToWishlist = async () => {
    dispatch(removeFromCart({ id }));
    const response = await postData("wishlist", {
      productId,
    });
    if (response.status === 201) {
      // setNotify({ open: true, message: "Product Wishlisted" });
    }
  };

  return (
    <Box border="1px solid lightgray" padding={1}>
      <Stack
        direction="row"
        spacing={2}
        pb={{ xs: 1, sm: 3 }}
        borderBottom="1px solid lightgray"
      >
        <Stack alignItems="center">
          <NavLink
            style={{ textDecoration: "none", display: "block" }}
            to={`/${name.replace(/\s+/g, "-")}?size=${size}&color=${color}`}
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
            <Typography fontWeight="bold" variant="h6" color="black">
              ₹ {price}
            </Typography>
            <Typography
              sx={{ textDecoration: "line-through" }}
              variant="subtitle1"
              color="gray"
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
        </Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={{ xs: 4, sm: 20 }}
        px={{ xs: 2, sm: 4 }}
        mb={-1}
      >
        <Button
          sx={{
            textTransform: "none",
            color: "gray",
            ":hover": { bgcolor: "white" },
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
            color: "gray",
            ":hover": { bgcolor: "white" },
          }}
          onClick={handleMoveToWishlist}
        >
          Move to wishlist
        </Button>
      </Stack>
    </Box>
  );
};

const Cart = () => {
  const { items: cart, loading } = useSelector((state) => state.cart);
  return (
    <>
      {loading && <Typography variant="h2">Loading...</Typography>}
      {!loading && cart.length === 0 && (
        <Typography variant="h3" mx="auto">
          No Product Found
        </Typography>
      )}
      {cart.map((cartProduct) => (
        <CartItem
          id={cartProduct.id}
          productId={cartProduct.productId}
          key={cartProduct.id}
          image={cartProduct.image}
          price={cartProduct.price}
          name={cartProduct.name}
          qty={cartProduct.quantity}
          discount={cartProduct.discount}
          color={cartProduct.color}
          size={cartProduct.size}
        />
      ))}
    </>
  );
};

export default Cart;
