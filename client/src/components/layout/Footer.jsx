import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Pinterest from "@mui/icons-material/Pinterest";
import Twitter from "@mui/icons-material/Twitter";
import YouTube from "@mui/icons-material/YouTube";
import { Paper, Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Paper sx={{ p: { xs: 1, sm: "32px 0 16px 0" } }}>
      <Stack
        justifyContent="center"
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 14 }}
        color="text.secondary"
      >
        <Stack spacing={1} alignItems={{ xs: "center", sm: "start" }}>
          <Typography fontWeight="medium" variant="h5" mb={2}>
            LOCATION
          </Typography>
          <Typography variant="subtitle2">
            support@ultimate-garments.in
          </Typography>
        </Stack>
        <Stack spacing={1} alignItems={{ xs: "center", sm: "start" }}>
          <Typography fontWeight="medium" variant="h5" mb={2}>
            COMPANY
          </Typography>
          <Typography variant="body2">About Us</Typography>
          <Typography variant="body2">Term and Conditions</Typography>
          <Typography variant="body2">Privacy Policy</Typography>
          <Typography variant="body2">Shipping Policy</Typography>
        </Stack>
        <Stack spacing={1} alignItems={{ xs: "center", sm: "start" }}>
          <Typography fontWeight="medium" variant="h5" mb={2}>
            NEED HELP
          </Typography>
          <Typography variant="body2">Contact Us</Typography>
          <Typography variant="body2">
            Return, Refund and Cancellation
          </Typography>
          <Typography variant="body2">FAQ`&apos;s</Typography>
          <Typography variant="body2">Track Order</Typography>
        </Stack>
        <Stack spacing={1} alignItems={{ xs: "center", sm: "start" }}>
          <Typography fontWeight="medium" variant="h5" mb={2}>
            LETS BE FRIENDS
          </Typography>
          <Stack spacing={1} direction="row">
            <Facebook />
            <Twitter />
            <Pinterest />
            <Instagram />
            <YouTube />
            <LinkedIn />
          </Stack>
        </Stack>
      </Stack>
      <Typography fontWeight={500} textAlign="center" mt={4}>
        &copy; 2023 Ultimate Garments
      </Typography>
    </Paper>
  );
};

export default Footer;
