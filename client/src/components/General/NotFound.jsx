import { Box, Typography } from "@mui/material";
import React from "react";
import NotFoundImage from "../../assets/not-found.png";

const NotFound = ({ message }) => {
  return (
    <Box
      height="calc(100vh - 108px)"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img src={NotFoundImage} alt="not found"></img>
      <Typography mt={2} variant="h4">
        {message}
      </Typography>
    </Box>
  );
};

export default NotFound;
