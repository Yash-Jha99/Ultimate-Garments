import { Box, Typography } from "@mui/material";
import React from "react";
import NotFoundImage from "../../assets/page-not-found.jpg";

const NotFound = ({ message, image = NotFoundImage }) => {
  return (
    <Box
      height="calc(100vh - 80px)"
      bgcolor="background.paper"
      boxShadow={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img style={{ objectFit: "contain" }} src={image} width={700} height={250} alt="not found"></img>
      <Typography mt={2} variant="h4">
        {message}
      </Typography>
    </Box>
  );
};

export default NotFound;
