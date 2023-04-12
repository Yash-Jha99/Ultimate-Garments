import { makeStyles } from "@mui/styles";
import { Stack, Avatar, Divider, Box, Button } from "@mui/material";
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/auth";
import { stringToColor } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    fontSize: 20,
    fontWeight: 600,
    padding: 16,
    textAlign: "center",
    color: theme.palette.grey[900],
    "&.active": {
      color: theme.palette.secondary.main,
    },
  },
}));

const MyAccount = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth.user);
  const location = useLocation();
  return (
    <Stack direction="row" mt={2}>
      <Stack
        m={{ xs: "0 4px", sm: "0 0 0 64px" }}
        spacing={{ xs: 1.5, sm: 0 }}
        display={{
          xs: location.pathname === "/myaccount" ? "flex" : "none",
          sm: "flex",
        }}
        width={{ xs: "100%", sm: "30%" }}
        boxShadow={2}
        bgcolor="white"
        divider={<Divider flexItem orientation="horizontal" />}
      >
        <Stack>
          <Box
            p={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar
              src="#"
              sx={{
                width: 80,
                height: 80,
                fontSize: 48,
                fontWeight: 500,
                bgcolor: stringToColor(name),
              }}
              alt={name}
            />

            <Typography variant="h5" mt={2}>
              {name}
            </Typography>
          </Box>
        </Stack>
        <NavLink className={classes.link} to="/myaccount/profile">
          My Profile
        </NavLink>
        <NavLink className={classes.link} to="/myaccount/orders">
          Orders
        </NavLink>
        <NavLink className={classes.link} to="/myaccount/wishlist">
          Wishlist
        </NavLink>
        <NavLink className={classes.link} to="/myaccount/address">
          Address
        </NavLink>
        <Button
          variant="contained"
          sx={{ p: 1, fontSize: 20, fontWeight: 600, color: "black" }}
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
      </Stack>
      {location.pathname !== "/myaccount" && (
        <Box
          m={{ xs: "", sm: "0px 64px 0 16px" }}
          height={{ xs: "none", sm: "75vh" }}
          overflow="auto"
          bgcolor="white"
          boxShadow={2}
          width="100%"
          p={{ xs: 1, sm: 4 }}
        >
          <Outlet />
        </Box>
      )}
    </Stack>
  );
};

export default MyAccount;
