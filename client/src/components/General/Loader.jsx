import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = ({
  color = "secondary",
  size = 40,
  fullscreen = false,
  height = "100%",
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={fullscreen ? "calc(100vh - 80px)" : height}
      width="100%"
      zIndex={100}
    >
      <CircularProgress color={color} size={size} />
    </Box>
  );
};

export default Loader;
