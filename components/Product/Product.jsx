import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import { deleteData, postData } from "../../services/NodeService";
import { useSnackbar } from "notistack";
import FallbackImage from "../../assets/image-placeholder.jpg";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Product = ({
  id,
  image,
  price,
  handler,
  name,
  discount,
  wishlistId,
  badge = 0,
}) => {
  const [wishlisted, setWishlisted] = useState(wishlistId !== null);
  const [newWishlistId, setNewWishlistedId] = useState(wishlistId);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return router.push("/login?from=" + router.pathname);

    if (!wishlisted) {
      setWishlisted(true);
      const response = await postData("wishlist", {
        productId: id,
        userId: user.id,
      });
      if (response.status === 201) {
        enqueueSnackbar("Product Wishlisted", { variant: "success" });
        setNewWishlistedId(response.data.wishlistId);
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

  return (
    <Link href={`/${handler}`} style={{ textDecoration: "none" }}>
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
        <Box height={{ xs: 200, md: 340 }} mb={2}>
          <Image
            src={image}
            width={240}
            height={340}
            alt="product"
            loading="lazy"
            onLoad={(e) => (e.target.src = image)}
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
    </Link>
  );
};

export default Product;
