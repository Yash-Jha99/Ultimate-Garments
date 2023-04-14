import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = ({ color = "secondary" }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      bgcolor="rgba(255,255,255,0.8)"
      zIndex={1000}
      position="fixed"
      top={0}
      left={0}
    >
      <CircularProgress color={color} />
    </Box>
  );
};

export default Loader;
