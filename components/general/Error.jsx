import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import NotFoundImage from "../../assets/page-not-found.webp";
import ErrorRounded from "@mui/icons-material/ErrorRounded";
import Image from "next/image";

const Error = ({ children }) => {
  const error = useRouteError();
  const navigate = useNavigate();
  error && console.log("Route Error", error);

  return (
    <Stack
      bgcolor="white"
      height="100vh"
      spacing={3}
      justifyContent="center"
      alignItems="center"
    >
      {error?.status === 404 ? (
        <Image
          style={{ objectFit: "contain" }}
          src={NotFoundImage}
          width={800}
          height={800}
          alt="Page Not Found"
        />
      ) : (
        <>
          <ErrorRounded sx={{ fontSize: 150 }} color="error" />
          <Typography variant="h4">Something went wrong !</Typography>
        </>
      )}
      <Button
        style={{ backgroundColor: "#2874f0" }}
        variant="contained"
        color="primary"
        onClick={() => navigate("/", { replace: true })}
      >
        GO TO HOMEPAGE
      </Button>
    </Stack>
  );
};

export default Error;
