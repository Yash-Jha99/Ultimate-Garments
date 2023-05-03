import { Stack, Avatar, Divider, Box, Button } from "@mui/material";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/auth";
import { stringToColor } from "../utils/utils";
const MyAccount = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth.user);
  const location = useLocation();
  return (
    <Stack direction="row">
      <Stack
        m={{ xs: "0 4px", sm: "0 0 0 64px" }}
        spacing={{ xs: 1.5, sm: 1 }}
        display={{
          xs: location.pathname === "/myaccount" ? "flex" : "none",
          sm: "flex",
        }}
        width={{ xs: "100%", sm: "30%" }}
        position={"sticky"}
        top={78}
        height="86vh"
        boxShadow={2}
        bgcolor="white"
        divider={<Divider flexItem orientation="horizontal" />}
      >
        <Stack>
          <Box
            p={3}
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
        <NavLink style={{
          textDecoration: "none",
          fontSize: 20,
          fontWeight: 500,
          padding: 16,
          textAlign: "center",
          color: "black",
        }}
          className="link"
          to="/myaccount/profile">
          My Profile
        </NavLink>
        <NavLink style={{
          textDecoration: "none",
          fontSize: 20,
          fontWeight: 500,
          padding: 16,
          textAlign: "center",
          color: "black",
        }}
          className="link"
          to="/myaccount/orders">
          Orders
        </NavLink>
        <NavLink style={{
          textDecoration: "none",
          fontSize: 20,
          fontWeight: 500,
          padding: 16,
          textAlign: "center",
          color: "black",
        }}
          className="link"
          to="/myaccount/wishlist">
          Wishlist
        </NavLink>
        <NavLink style={{
          textDecoration: "none",
          fontSize: 20,
          fontWeight: 500,
          padding: 16,
          textAlign: "center",
          color: "black",
        }}
          className="link"
          to="/myaccount/address">
          Address
        </NavLink>
        <Button
          sx={{ p: 1, fontSize: 20, fontWeight: 600 }}
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
      </Stack>
      {location.pathname !== "/myaccount" && (
        <Box m={{ xs: "", sm: "0px 64px 0px 16px" }} width="100%">
          <Outlet />
        </Box>
      )}
    </Stack>
  );
};

export default MyAccount;
