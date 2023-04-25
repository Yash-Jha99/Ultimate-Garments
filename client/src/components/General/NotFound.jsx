import { Box, Typography } from "@mui/material";
import React from "react";
import NotFoundImage from "../../images/not-found.png";

const NotFound = ({ message }) => {
  return (
    <Box
      height="90vh"
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
