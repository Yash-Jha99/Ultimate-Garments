import { useTheme } from "@emotion/react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import useDataFetch from "../../hooks/useDataFetch";
import Loader from "../general/Loader";

const STEP_INC = 0.202;

const ProductRow = ({ category, title = null }) => {
  const theme = useTheme();
  const [params] = useState({ category });
  const { loading, data: products } = useDataFetch("product", [], null, params);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = products.length - 5;

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Number((prevActiveStep + STEP_INC).toFixed(3))
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      Number((prevActiveStep - STEP_INC).toFixed(3))
    );
  };

  const handleStepChange = (step) => {
    if (activeStep === STEP_INC * steps) return;
    setActiveStep(step);
  };

  return (
    <Box position="relative" bgcolor="white" py={1} boxShadow={2}>
      <Typography
        px={2}
        py={1}
        mb={1}
        borderBottom="1px solid lightgray"
        variant="h5"
      >
        {title}
      </Typography>
      {loading && <Loader height={{ xs: 270, sm: 310 }} />}
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        slideStyle={{ width: "max-content", padding: "0px 6.5px" }}
        onChangeIndex={handleStepChange}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/${product.handler}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Stack
              justifyContent="center"
              width={{ xs: 160, sm: 240 }}
              bgcolor="white"
            >
              <Box
                component="img"
                sx={{
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                  height: { xs: 200, sm: 260 },
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
                  pt={2}
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
          </Link>
        ))}
      </SwipeableViews>
      <IconButton
        sx={{
          display: { xs: "none", sm: "flex" },
          position: "absolute",
          borderRadius: 0,
          zIndex: 10,
          width: 40,
          height: 70,
          border: "1px solid gray",
          ":hover": { bgcolor: "white" },
          bgcolor: "white",
          top: "42%",
          right: 0,
          visibility:
            activeStep === STEP_INC * steps || steps <= 0
              ? "hidden"
              : "visible",
        }}
        onClick={handleNext}
        disabled={activeStep === STEP_INC * steps}
      >
        <KeyboardArrowRight fontSize="large" />
      </IconButton>
      <IconButton
        sx={{
          display: { xs: "none", sm: "flex" },
          position: "absolute",
          borderRadius: 0,
          zIndex: 10,
          width: 40,
          height: 70,
          border: "1px solid gray",
          ":hover": { bgcolor: "white" },
          bgcolor: "white",
          top: "42%",
          left: 0,
          visibility: activeStep <= 0 ? "hidden" : "visible",
        }}
        onClick={handleBack}
        disabled={activeStep <= 0}
      >
        <KeyboardArrowLeft fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default ProductRow;
