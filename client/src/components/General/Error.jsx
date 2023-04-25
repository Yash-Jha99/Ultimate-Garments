import { Box, Typography } from "@mui/material";
import React from "react";
import { useRouteError } from "react-router-dom";

const Error = ({ children }) => {
  const error = useRouteError();
  error && console.log("Route Error", error);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h4">{children ?? "Something Went Wrong"}</Typography>
    </Box>
  );
};

export default Error;
