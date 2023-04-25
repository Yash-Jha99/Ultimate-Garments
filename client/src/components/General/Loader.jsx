import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = ({ color = "secondary", fullscreen = false }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={fullscreen ? "100vh" : "100%"}
      width={fullscreen ? "100wh" : "100%"}
      position={fullscreen ? "fixed" : "static"}
      zIndex={1000}
    >
      <CircularProgress color={color} />
    </Box>
  );
};

export default Loader;
