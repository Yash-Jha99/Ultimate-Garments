import { useTheme } from "@emotion/react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";

const ProductRow = ({ products }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = Math.round((products.length - 4) / 2);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 0.51);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 0.51);
  };

  const handleStepChange = (step) => {
    if (activeStep * 2 >= maxSteps - 1) return;
    setActiveStep(step);
  };

  return (
    <Box position="relative">
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        slideStyle={{ width: 300, paddingRight: 20 }}
        onChangeIndex={handleStepChange}
      >
        {products.map((product) => (
          <Stack
            key={product.id}
            justifyContent="center"
            width={300}
            bgcolor="white"
          >
            <Box
              component="img"
              sx={{
                display: "block",
                overflow: "hidden",
                width: "100%",
                height: 300,
                objectFit: "contain",
              }}
              src={product.image}
              alt={product.name}
            />
            <Box
              mx={1}
              width="90%"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              textAlign="center"
            >
              <Typography
                mt={1}
                fontWeight="bold"
                variant="caption"
                color="text.light"
              >
                {product.name}
              </Typography>
              <Typography fontWeight="bold" variant="subtitle1">
                ₹{product.price}
              </Typography>
            </Box>
          </Stack>
        ))}
      </SwipeableViews>
      <IconButton
        sx={{
          position: "absolute",
          border: "1px solid gray",
          ":hover": { bgcolor: "white" },
          bgcolor: "white",
          top: "42%",
          right: 0,
        }}
        onClick={handleNext}
        disabled={activeStep * 2 >= maxSteps - 1}
      >
        <KeyboardArrowRight fontSize="large" />
      </IconButton>
      <IconButton
        sx={{
          position: "absolute",
          border: "1px solid gray",
          ":hover": { bgcolor: "white" },
          bgcolor: "white",
          top: "42%",
          left: 0,
        }}
        onClick={handleBack}
        disabled={activeStep === 0}
      >
        <KeyboardArrowLeft fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default ProductRow;
