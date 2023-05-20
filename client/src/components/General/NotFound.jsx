import { Box, Typography } from "@mui/material";
import NotFoundImage from "../../assets/not-found.png";

const NotFound = ({ message, image = NotFoundImage }) => {
  return (
    <Box
      height="calc(100vh - 90px)"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img
        style={{ objectFit: "contain" }}
        src={image}
        width={210}
        height={250}
        alt="not found"
      ></img>
      <Typography mt={2} variant="h4">
        {message}
      </Typography>
    </Box>
  );
};

export default NotFound;
