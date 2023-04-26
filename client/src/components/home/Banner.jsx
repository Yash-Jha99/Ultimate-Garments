import React from "react";
import { Box } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useTheme } from "@emotion/react";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Banner = ({ images }) => {
  const theme = useTheme();

  return (
    <AutoPlaySwipeableViews
      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
      enableMouseEvents
      direction="incremental"
    >
      {images.map((step, index) => (
        <div key={step.label}>
          <Box
            component="img"
            sx={{
              display: "block",
              overflow: "hidden",
              width: "100%",
            }}
            src={step.image}
            alt={step.label}
          />
        </div>
      ))}
    </AutoPlaySwipeableViews>
  );
};

export default Banner;
