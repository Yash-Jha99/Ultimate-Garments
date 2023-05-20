import { Box, CircularProgress } from "@mui/material";

const NavigationLoader = ({
  color = "secondary",
  size = 40,
  fullscreen = false,
  height = "calc(100vh - 80px)",
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={fullscreen ? "100vh" : height}
      width="100%"
      zIndex={1000}
      bgcolor={fullscreen ? "background.paper" : "initial"}
      position={fullscreen ? "fixed" : "initial"}
      top={0}
      left={0}
    >
      <CircularProgress color={color} size={size} />
    </Box>
  );
};

export default NavigationLoader;
