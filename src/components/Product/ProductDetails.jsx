import { Check, FavoriteBorder, LocalOffer } from "@mui/icons-material";
import {
  IconButton,
  Typography,
  FormControl,
  MenuItem,
  Select,
  Button,
  Avatar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BoltIcon from "@mui/icons-material/Bolt";
import { Box, Stack, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteData, postData } from "../../Services/NodeService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/reducers/cart";
import useDataFetch from "../../hooks/useDataFetch";
import Error from "../General/Error";
import Loader from "../General/Loader";
import { addToCheckout } from "../../store/reducers/checkout";

const ProductDetails = () => {
  const { search } = useLocation();
  const { productName } = useParams();
  const dispatch = useDispatch();
  const {
    cart: { items: cart },
    auth: { user, isLoggedIn },
  } = useSelector((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(search);
  const [qty, setQty] = useState(1);
  const [notify, setNotify] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [inValid, setInValid] = useState("");

  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [wishlisted, setWishlisted] = useState(false);
  const [newWishlistId, setNewWishlistedId] = useState("");
  const [isProductInCart, setIsProductInCart] = useState(false);

  const {
    error,
    loading,
    data: product,
  } = useDataFetch("product/" + productName.replace(/-/g, " "), {}, (data) => {
    const selectedColor =
      data.colors.find((color) => color.label === query.get("color")) ?? {};
    const selectedSize =
      data.sizes.find((size) => size.name === query.get("size")) ?? {};
    setSelectedSize(selectedSize ?? {});
    setSelectedColor(selectedColor ?? {});
    setWishlisted(data.wishlistId !== null);
    setNewWishlistedId(data.wishlistId);
    setIsProductInCart(
      cart.findIndex(
        (item) =>
          item.productId === data.id &&
          item.color === selectedColor.label &&
          item.size === selectedSize.name
      ) !== -1
    );
  });

  if (loading) return <Loader />;

  if (error) return <Error>Product Not Found</Error>;

  const {
    id,
    image,
    name,
    price,
    description,
    sizes,
    discount,
    offer = "FLAT ₹100 OFF On ₹999 (Code:SHIRT100)",
    colors,
    options,
  } = product;

  const handleWishlist = async () => {
    if (!isLoggedIn) return navigate("/login?from=" + location.pathname);
    if (!wishlisted) {
      const response = await postData("wishlist", {
        productId: id,
        userId: user.id,
      });
      if (response.status === 201) {
        setNotify({
          open: true,
          message: "Product Wishlisted",
          severity: "success",
        });
        setWishlisted(true);
        setNewWishlistedId(response.data.wishlistId);
      }
      return;
    }
    const response = await deleteData("wishlist/" + newWishlistId);
    if (response.status === 200) {
      setNotify({
        open: true,
        message: "Product removed from wishlist",
        severity: "success",
      });
      setWishlisted(false);
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) return navigate("/login?from=" + location.pathname);
    if (isProductInCart) return navigate("/checkout/cart");

    if (!selectedColor.id) return setInValid("color");
    if (!selectedSize.id) return setInValid("size");

    const selectedOption = options.find(
      (opt) =>
        opt.sizeId === selectedSize.id && opt.colorId === selectedColor.id
    );
    if (!selectedOption) {
      setNotify({
        open: true,
        message: "Selected size-color combination doesn't exist",
        severity: "info",
      });
      return;
    }

    setNotify({
      open: true,
      message: "Product Added To Cart",
      severity: "success",
    });
    dispatch(
      addToCart({
        productId: id,
        quantity: qty,
        productOptionId: selectedOption.productOptionId,
      })
    );
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) return navigate("/login?from=" + location.pathname);
    if (!selectedColor.id) return setInValid("color");
    if (!selectedSize.id) return setInValid("size");

    const selectedOption = options.find(
      (opt) =>
        opt.sizeId === selectedSize.id && opt.colorId === selectedColor.id
    );
    if (!selectedOption) {
      setNotify({
        open: true,
        message: "Selected size-color combination doesn't exist",
        severity: "info",
      });
      return;
    }

    dispatch(
      addToCheckout([
        {
          productId: id,
          price,
          product_option_id: selectedOption.productOptionId,
          quantity: qty,
          discount,
        },
      ])
    );
    navigate("/checkout/shipping");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({ open: false, message: "", severity: "" });
  };

  return (
    <Box bgcolor="white">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 10 }}
        alignItems="center"
        justifyContent="center"
        p={{ xs: 2, sm: 8 }}
      >
        <Box
          height={{ xs: 400, md: "60vh" }}
          width={{ xs: "85%", md: "40%" }}
          p={{ xs: 1, sm: 5 }}
          border="1px solid gray"
        >
          <img
            src={image}
            alt="product"
            style={{
              objectFit: "contain",
            }}
            width="100%"
            height="100%"
          />
        </Box>
        <Stack spacing={1} width="100%">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">{name}</Typography>
            <IconButton
              onClick={handleWishlist}
              sx={{
                width: "32px",
                height: "32px",
                bgcolor: wishlisted ? "primary.main" : "lightgray",
                ":hover": {
                  bgcolor: wishlisted ? "primary.main" : "lightgray",
                },
              }}
            >
              <FavoriteBorder color="action" />
            </IconButton>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
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
          <Stack direction="row">
            <Typography variant="subtitle2">
              Inclusive of All Taxes +
            </Typography>
            <Typography variant="subtitle2" color="orange">
              {" "}
              Free Shipping
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <LocalOffer color="warning" />
            <Typography variant="subtitle2">{offer}</Typography>
          </Stack>
          {colors?.length !== 0 && (
            <>
              {inValid === "color" && (
                <Typography color="error">Please select a color</Typography>
              )}
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  fontWeight={inValid === "color" ? "bold" : "medium"}
                  mr={2}
                  color={inValid === "color" && "error"}
                  sx={{ textTransform: "capitalize" }}
                  variant="subtitle1"
                >
                  Color* : {selectedColor.label}{" "}
                </Typography>
                {colors.map((color) => (
                  <Avatar
                    sx={{
                      cursor: "pointer",
                      bgcolor: color.value,
                    }}
                    onClick={() => {
                      setInValid("");
                      setSelectedColor(color);
                    }}
                    key={color.id}
                  >
                    {selectedColor.id === color.id ? <Check /> : ""}
                  </Avatar>
                ))}
              </Stack>
            </>
          )}
          {sizes?.length !== 0 && (
            <>
              {inValid === "size" && (
                <Typography color="error">Please select a size</Typography>
              )}
              <Stack direction="row" spacing={1} alignItems="center" pt={1}>
                <Typography
                  mr={2}
                  fontWeight={inValid === "size" ? "bold" : "medium"}
                  color={inValid === "size" && "error"}
                  variant="subtitle1"
                >
                  Size* :{" "}
                </Typography>
                {sizes.map((size) => (
                  <Avatar
                    sx={{
                      cursor: "pointer",
                      bgcolor: "white",
                      border: "2px solid",
                      borderColor:
                        selectedSize.id === size.id
                          ? "secondary.main"
                          : "lightgray",
                      color: "black",
                      fontSize: "16px",
                    }}
                    onClick={() => {
                      setInValid("");
                      setSelectedSize(size);
                    }}
                    key={size.id}
                  >
                    {size.name}
                  </Avatar>
                ))}
              </Stack>
            </>
          )}
          <Stack direction="row" spacing={2} alignItems="center" pt={1}>
            <Typography fontWeight="medium" variant="subtitle1">
              Quantity:
            </Typography>
            <Box sx={{ minWidth: 60 }}>
              <FormControl fullWidth>
                <Select
                  color="warning"
                  id="demo-simple-select"
                  size="small"
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
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
          <Stack
            direction="row"
            justifyContent="space-around"
            columnGap={1}
            py={{ xs: 1.2, sm: 4 }}
            bgcolor="white"
            position={{ xs: "fixed", sm: "static" }}
            width="91%"
            bottom={0}
          >
            <Button
              sx={{ maxWidth: "250px", fontSize: { xs: 12, sm: 18 } }}
              fullWidth
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
            >
              {isProductInCart ? "GO TO CART" : "ADD TO CART"}
            </Button>
            <Button
              sx={{ maxWidth: "250px", fontSize: { xs: 12, sm: 18 } }}
              fullWidth
              size="large"
              variant="contained"
              startIcon={<BoltIcon />}
              onClick={handleBuyNow}
            >
              BUY NOW
            </Button>
          </Stack>
          <Stack spacing={1} pt={3}>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body2">{description}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Snackbar
        open={notify.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={notify.severity || "success"}
          sx={{ width: "100%" }}
          variant="filled"
          elevation={2}
        >
          {notify.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetails;
