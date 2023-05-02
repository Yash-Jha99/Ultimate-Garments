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
import { postData } from "../../services/NodeService";
import { useSnackbar } from "notistack";
import Loader from "../general/Loader";
import Image from "next/image";
import Checkout from "../layouts/Checkout";

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
    <Box
      sx={{ ":hover": { boxShadow: 2 } }}
      p={2}
      bgcolor="white"
      boxShadow={2}
    >
      <Stack
        direction="row"
        spacing={2}
        pb={{ xs: 1, sm: 1 }}
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
              <Image
                src={image}
                alt="product"
                style={{
                  objectFit: "contain",
                }}
                width={120}
                height={120}
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
      <Stack
        direction="row"
        justifyContent="space-around"
        px={{ xs: 2, sm: 4 }}
        mb={-2}
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
    <Checkout>
      hi
      {/* <Stack spacing={{ xs: 1, sm: 2 }}>
        {loading && <Loader />}
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
            quantityInStock={cartProduct.quantityInStock}
          />
        ))}
      </Stack> */}
    </Checkout>
  );
};

export default Cart;
