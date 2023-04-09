import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, IconButton, Snackbar, Alert } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { deleteData, postData } from "../../Services/NodeService";

const Product = ({
  id,
  image,
  price,
  name,
  discount,
  wishlistId,
  badge = 0,
}) => {
  const [wishlisted, setWishlisted] = useState(wishlistId !== null);
  const [newWishlistId, setNewWishlistedId] = useState(wishlistId);
  const [notify, setNotify] = React.useState({ open: false, message: "" });

  const { user } = useSelector((state) => state.auth);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!wishlisted) {
      const response = await postData("wishlist", {
        productId: id,
        userId: user.id,
      });
      if (response.status === 201) {
        setNotify({ open: true, message: "Product Wishlisted" });
        setWishlisted(true);
        setNewWishlistedId(response.data.wishlistId);
      }
      return;
    }
    const response = await deleteData("wishlist/" + newWishlistId);
    if (response.status === 200) {
      setNotify({ open: true, message: "Product removed from wishlist" });
      setWishlisted(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({ open: false, message: "" });
  };

  return (
    <Link
      to={`/${name.replace(/\s+/g, "-")}`}
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          position: "relative",
          ":hover": { boxShadow: 4 },
          color: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          bgcolor: "white",
          height: "100%",
        }}
      >
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
        <IconButton
          disableRipple
          onClick={handleClick}
          sx={{
            width: "32px",
            height: "32px",
            bgcolor: "white",
            position: "absolute",
            right: "8px",
            top: "8px",
            ":hover": {
              bgcolor: "white",
            },
          }}
        >
          {wishlisted ? (
            <Favorite color="primary" />
          ) : (
            <FavoriteBorder color="action" />
          )}
        </IconButton>
        <Box height={{ xs: 200, md: 400 }}>
          <img
            src={image}
            style={{
              objectFit: "contain",
              display: "block",
            }}
            height="100%"
            width="100%"
            alt="product"
            loading="lazy"
          />
        </Box>
        <Box
          mx={1}
          width="90%"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          textAlign="center"
        >
          <Typography
            mt={1}
            fontWeight="bold"
            variant="caption"
            color="text.light"
          >
            {name}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          columnGap={1}
          pb={1}
        >
          <Typography fontWeight="bold" variant="subtitle1" color="error.light">
            ₹{price}
          </Typography>
          <Typography
            sx={{ textDecoration: "line-through" }}
            variant="body2"
            color="text.main"
          >
            ₹{Math.ceil(price * (1 + discount / 100))}
          </Typography>
          <Typography variant="caption" color="success.light">
            ({discount}% off)
          </Typography>
        </Box>
      </Box>
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
    </Link>
  );
};

export default Product;
