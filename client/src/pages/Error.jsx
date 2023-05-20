import ErrorRounded from "@mui/icons-material/ErrorRounded";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import pageNotFoundImage from "../assets/page-not-found.png";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  if (error) console.log("[ROUTER Error]: ", error.message);

  return (
    <Paper>
      <Stack
        height="100vh"
        spacing={3}
        p={2}
        justifyContent="center"
        alignItems="center"
      >
        {isRouteErrorResponse(error) ? (
          <Box textAlign="center">
            <img
              style={{ width: "500px", maxWidth: "100%" }}
              src={pageNotFoundImage}
              alt="Page Not Found"
            />
            <Typography variant="h4" mt={1}>
              Page Not Found !
            </Typography>
          </Box>
        ) : (
          <Box textAlign="center">
            <ErrorRounded sx={{ fontSize: 150 }} color="error" />
            <Typography>Error : {error.message}</Typography>
            <Typography variant="h4">Something went wrong !</Typography>
          </Box>
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
    </Paper>
  );
};

export default Error;
