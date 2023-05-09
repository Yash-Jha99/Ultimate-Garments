import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Check from "@mui/icons-material/Check";
import LocalOffer from "@mui/icons-material/LocalOffer";
import {
  IconButton,
  Typography,
  FormControl,
  MenuItem,
  Select,
  Button,
  Avatar,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardActions,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BoltIcon from "@mui/icons-material/Bolt";
import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteData, postData } from "../services/NodeService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/reducers/cart";
import { addToCheckout } from "../store/reducers/checkout";
import { useSnackbar } from "notistack";
import DeliveryOptions from "../components/Product/DeliveryOptions";
import NotFound from "../components/general/NotFound";

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
  const { enqueueSnackbar } = useSnackbar();
  const { product } = useLoaderData()

  if (!product.name) return <NotFound message="Product Not Found" />

  const {
    id,
    image,
    name,
    price,
    description,
    discount,
    offer = "FLAT ₹100 OFF On ₹999 (Code:SHIRT100)",
    options,
    colors,
    wishlist
  } = product;

  const wishlistId = wishlist?.[0]?.id ?? null
  const [qty, setQty] = useState(1);
  const [inValid, setInValid] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors.find((color) => color.handler === productName) ?? {});
  const [selectedSize, setSelectedSize] = useState(options.find((size) => size.size === query.get("size")) ?? {});
  const [wishlisted, setWishlisted] = useState(wishlistId !== null);
  const [newWishlistId, setNewWishlistedId] = useState(wishlistId);
  const isProductInCart = cart.findIndex(
    (item) =>
      item.productId === id &&
      item.color === selectedColor.label &&
      item.size === selectedSize.name
  ) !== -1
  const selectedOption = options.find((opt) => opt.size === selectedSize?.name);

  const sizes = options.map((option) => ({
    name: option.size,
    id: option.sku,
  }));

  const outOfStock = selectedOption?.stock === 0;
  const isCheckoutValid =
    selectedOption !== undefined &&
    !outOfStock &&
    selectedOption.stock >= qty;

  const handleWishlist = async () => {
    if (!isLoggedIn) return navigate("/login?from=" + location.pathname);
    if (!wishlisted) {
      setWishlisted(true);
      const response = await postData("wishlist", {
        productId: id,
        userId: user.id,
      });
      if (response.status === 201) {
        enqueueSnackbar("Product Wishlisted", { variant: "success" });
        setNewWishlistedId(response.data.id);
      } else {
        setWishlisted(false);
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
      return;
    }
    setWishlisted(false);
    const response = await deleteData("wishlist/" + newWishlistId);
    if (response.status === 200) {
      enqueueSnackbar("Product Removed from wishlist", { variant: "success" });
    } else {
      setWishlisted(true);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) return navigate("/login?from=" + location.pathname);
    if (isProductInCart) return navigate("/checkout/cart");

    if (!selectedOption) {
      enqueueSnackbar("Selected size-color combination doesn't exist", {
        variant: "info",
      });
      return;
    }

    if (!isCheckoutValid)
      return enqueueSnackbar("Please select less quantity", {
        variant: "info",
      });

    enqueueSnackbar("Product added to cart", { variant: "success" });
    dispatch(
      addToCart({
        productId: id,
        quantity: qty,
        productOptionId: selectedOption.id,
      })
    );
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) return navigate("/login?from=" + location.pathname);

    if (!selectedOption) {
      enqueueSnackbar("Selected size-color combination doesn't exist", {
        variant: "info",
      });
      return;
    }

    if (!isCheckoutValid)
      return enqueueSnackbar("Please select less quantity", {
        variant: "info",
      });

    dispatch(
      addToCheckout([
        {
          option: { id: selectedOption.id },
          quantity: qty,
          product: { discount, price, id }
        },
      ])
    );
    navigate("/checkout/shipping");
  };

  return (
    <Paper>
      <Box pb={{ xs: 8, sm: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 4, sm: 8 }}
          alignItems={{ xs: "center", sm: "start" }}
          justifyContent="center"
          p={{ xs: 2, sm: 4 }}
          mx={{ xs: 0, sm: 2 }}
        >
          <Stack
            width={{ xs: "100%", sm: "40%" }}
            alignItems="center"
            position={{ xs: "initial", sm: "sticky" }}
            top={80}
          >
            <Box
              height={{ xs: "100%", sm: "100%" }}
              width={{ xs: "100vw", sm: "68%" }}
            >
              <Paper sx={{
              }} variant="outlined">

                <img
                  src={image}
                  alt="product"
                  style={{
                    objectFit: "contain",
                  }}
                  width="100%"
                  height="100%"
                />
              </Paper>
            </Box>
            <Stack
              direction="row"
              bgcolor={{ sm: "transparent", xs: "background.paper" }}
              spacing={2}
              boxShadow={{ xs: 4, sm: 0 }}
              width={{ xs: "94%", sm: "100%" }}
              py={{ xs: 1.2, sm: 1 }}
              px={{ xs: 1.2, sm: 0 }}
              mt={2}
              position={{ xs: "fixed", sm: "static" }}
              bottom={0}
              zIndex={20}
            >
              <Button
                sx={{ maxWidth: "250px", fontSize: { xs: 12, sm: 16 } }}
                fullWidth
                size="large"
                variant="contained"
                color="secondary"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={outOfStock}
              >
                {isProductInCart ? "GO TO CART" : "ADD TO CART"}
              </Button>
              <Button
                sx={{ maxWidth: "250px", fontSize: { xs: 12, sm: 16 } }}
                fullWidth
                size="large"
                variant="contained"
                startIcon={<BoltIcon />}
                onClick={handleBuyNow}
                disabled={outOfStock}
              >
                BUY NOW
              </Button>
            </Stack>
          </Stack>
          <Stack
            spacing={2}
            width={{ xs: "100%", sm: "60%" }}
            position="relative"
          >
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">{name}</Typography>
              <IconButton
                onClick={handleWishlist}
                sx={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid lightgray",
                }}
              >
                {wishlisted ? (
                  <Favorite color="primary" />
                ) : (
                  <FavoriteBorder color="action" />
                )}
              </IconButton>
            </Box>
            <Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography fontWeight="bold" variant="h5" color="text">
                  ₹ {price}
                </Typography>
                <Typography
                  sx={{ textDecoration: "line-through" }}
                  variant="h6"
                  color="text.secondary"
                >
                  ₹ {Math.ceil(price * (1 + discount / 100))}
                </Typography>
                <Typography variant="subtitle1" color="success.light">
                  ({discount}% off)
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant="body2">
                  Inclusive of All Taxes + &nbsp;{" "}
                </Typography>
                <Typography variant="body2" color="orange">
                  {" "}
                  Free Shipping
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1} py={1}>
              <LocalOffer color="warning" />
              <Typography variant="subtitle2">{offer}</Typography>
            </Stack>
            {colors?.length !== 0 && (
              <Stack>
                <Typography
                  fontWeight={inValid === "color" ? "bold" : "medium"}
                  mr={2}
                  color={inValid === "color" && "error"}
                  sx={{ textTransform: "capitalize" }}
                  variant="subtitle1"
                >
                  Color* : {selectedColor.label}{" "}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {colors.map((color) => (
                    <Avatar
                      src={color.image.concat("&height=100")}
                      sx={{
                        cursor: "pointer",
                        border: "2px solid",
                        borderColor:
                          color.label === selectedColor.label
                            ? "secondary.main"
                            : "transparent",
                        width: 72,
                        height: 100,
                        borderRadius: 0,
                        objectFit: "contain",
                      }}
                      onClick={() => {
                        setInValid("");
                        setSelectedColor(color);
                        navigate("/" + color.handler);
                      }}
                      key={color.label}
                    >
                      {selectedColor.label === color.label ? <Check /> : ""}
                    </Avatar>
                  ))}
                </Stack>
              </Stack>
            )}
            {sizes?.length !== 0 && (
              <Stack>
                <Typography
                  mr={2}
                  fontWeight={inValid === "size" ? "bold" : "medium"}
                  color={inValid === "size" && "error"}
                  variant="subtitle1"
                >
                  Size* :{" "}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {sizes.map((size) => (
                    <Avatar
                      sx={{
                        cursor: "pointer",
                        border: "2px solid",
                        borderColor:
                          selectedSize.id === size.id
                            ? "secondary.main"
                            : "text.lighter",
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
              </Stack>
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
            <DeliveryOptions />
            <Stack
              width={{ xs: "100%", sm: "100%" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
            >
              <Card sx={{
                width: { xs: "100%", sm: "50%" }
              }}
                variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="div">Description</Typography>
                  <Typography variant="body2">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                    ></div>
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ width: { xs: "100%", sm: "50%" } }} variant="outlined" >
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Delivery & Return Policy
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We provide free shipping on all orders. Pay online to avoid
                    charges of ₹50/product applicable on COD orders. The return or
                    exchange can be done within 15 days after delivery. Every
                    delivery from Beyoung is processed under excellent condition and
                    in the fastest time possible. For our beloved customer’s care,
                    we give contactless delivery. Refer to FAQ for more information.
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Paper >
  );
};

export default ProductDetails;
