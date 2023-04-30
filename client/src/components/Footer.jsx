import {
  Facebook,
  Instagram,
  LinkedIn,
  Pinterest,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      width="100%"
      bgcolor="white"
      color="#434343"
      boxShadow={2}
      p={{ xs: 1, sm: "32px 0 16px 0" }}
    >
      <Stack
        justifyContent={{ xs: "center", sm: "center" }}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 14 }}
      >
        <Stack spacing={1}>
          <Typography color="#434343" fontWeight="medium" variant="h5" mb={2}>
            LOCATION
          </Typography>
          <Typography variant="subtitle2">
            support@ultimate-garments.in
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography color="#434343" fontWeight="medium" variant="h5" mb={2}>
            COMPANY
          </Typography>
          <Typography variant="body2">About Us</Typography>
          <Typography variant="body2">Term and Conditions</Typography>
          <Typography variant="body2">Privacy Policy</Typography>
          <Typography variant="body2">Shipping Policy</Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography color="#434343" fontWeight="medium" variant="h5" mb={2}>
            NEED HELP
          </Typography>
          <Typography variant="body2">Contact Us</Typography>
          <Typography variant="body2">
            Return, Refund and Cancellation
          </Typography>
          <Typography variant="body2">FAQ's</Typography>
          <Typography variant="body2">Track Order</Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography fontWeight="medium" variant="h5" mb={2}>
            LETS BE FRIENDS
          </Typography>
          <Stack spacing={1} direction="row" color="#434343">
            <Facebook />
            <Twitter />
            <Pinterest />
            <Instagram />
            <YouTube />
            <LinkedIn />
          </Stack>
        </Stack>
      </Stack>
      <Typography fontWeight={500} color="black" textAlign="center" mt={4}>
        &copy; 2023 Ultimate Garments
      </Typography>
    </Box>
  );
};

export default Footer;
