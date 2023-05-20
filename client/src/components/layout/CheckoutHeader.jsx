import { AppBar, Box, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import ShieldSVG from "../../assets/shield.svg";

const CheckoutHeader = () => {
  return (
    <Box position="sticky" top={0} zIndex={100} height="62px">
      <Paper sx={{ mx: 8 }}>
        <AppBar component="nav" color="inherit">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack
              width="100%"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={{ xs: 0, sm: 4 }}
              mx={{ xs: 1, sm: 5 }}
            >
              <Link to="/">
                <img src={Logo} alt="Ultimate Garments" width={80} />
              </Link>
              <Stack
                width={{ xs: 170, sm: "initial" }}
                direction="row"
                alignItems="center"
                spacing={1.5}
              >
                <img width={50} src={ShieldSVG} alt="" />
                <Typography
                  fontWeight={500}
                  fontSize={{ xs: 14, sm: 24 }}
                  variant="h5"
                >
                  100% SECURE PAYMENT
                </Typography>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      </Paper>
    </Box>
  );
};

export default CheckoutHeader;
