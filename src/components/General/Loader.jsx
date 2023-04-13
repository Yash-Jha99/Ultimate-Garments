import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = ({ color = "secondary" }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <CircularProgress color={color} />
    </Box>
  );
};

export default Loader;
