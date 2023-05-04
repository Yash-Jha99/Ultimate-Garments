import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import ErrorRounded from "@mui/icons-material/ErrorRounded";
import NotFoundImage from "../assets/page-not-found.webp";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate()
  if (error) console.log(error)

  return (
    <Stack
      bgcolor="white"
      height="100vh"
      spacing={3}
      justifyContent="center"
      alignItems="center"
    >
      {isRouteErrorResponse(error) ? (
        <img
          style={{ width: "800px", maxWidth: "100%" }}
          src={NotFoundImage}
          alt="Page Not Found"
        />
      ) : (
        <>
          <ErrorRounded sx={{ fontSize: 150 }} color="error" />
          <Typography>Error : {error.message}</Typography>
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
