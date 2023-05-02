import { Box, Fade } from "@mui/material";
import React, { useState } from "react";

const Dropdown = ({
  trigger,
  children,
  position = "center",
  open = false,
  TransitionComponent = Fade,
  onOpen = null,
  onClose = null,
  onClick = null,
  disableArrow = false,
  overlap = false,
  transitionProps = {},
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  let cn = {},
    acn = {};

  switch (position) {
    case "left":
      cn = { left: 0 };
      acn = { left: 14 };
      break;
    case "right":
      cn = { right: 0 };
      acn = { right: 14 };
      break;
    default:
      cn = { left: "50%", transform: "translateX(-50%)" };
      acn = { left: "47%" };
      break;
  }

  const menu = (
    <Box
      sx={{
        overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        py: 1,
        top: overlap ? "0" : "100%",
        ...cn,
        "&:before": !disableArrow && {
          content: '""',
          display: "block",
          position: "absolute",
          top: 0,
          ...acn,
          width: 10,
          height: 10,
          bgcolor: "background.paper",
          transform: "translateY(-50%) rotate(45deg)",
          zIndex: 0,
        },
      }}
      bgcolor="white"
      position="absolute"
    >
      {children}
    </Box>
  );

  const handleOpen = () => {
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  return (
    <Box
      position="relative"
      onMouseEnter={onOpen || handleOpen}
      onMouseLeave={onClose || handleClose}
    >
      <Box py={1}>{trigger}</Box>
      <TransitionComponent {...transitionProps} in={open || menuOpen}>
        {menu}
      </TransitionComponent>
    </Box>
  );
};

export default Dropdown;
