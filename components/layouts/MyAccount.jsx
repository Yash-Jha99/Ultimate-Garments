import { Stack, Avatar, Divider, Box, Button } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/auth";
import { stringToColor } from "../../utils/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/layouts/Layout";

const MyAccount = ({ children }) => {
  const dispatch = useDispatch();
  const name = "";
  // let { name } = useSelector((state) => state.auth.user);
  const router = useRouter();
  // if (typeof window === "undefined") name = "";
  return (
    <Layout>
      <Stack direction="row">
        <Stack
          m={{ xs: "0 4px", sm: "0 0 0 64px" }}
          spacing={{ xs: 1.5, sm: 1 }}
          display={{
            xs: router.pathname === "/myaccount" ? "flex" : "none",
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
                  bgcolor: stringToColor(name ?? ""),
                }}
                alt={name}
              />

              <Typography variant="h5" mt={2}>
                {typeof window !== undefined && name}
              </Typography>
            </Box>
          </Stack>
          <Link style={{ textDecoration: "none", fontSize: 20, padding: 18,textAlign:"center" ,color:router.pathname==="/myaccount/profile"?"#03a9f4":"initial"}} href="/myaccount/profile">My Profile</Link>
          <Link style={{ textDecoration: "none", fontSize: 20, padding: 18,textAlign:"center" ,color:router.pathname==="/myaccount/orders"?"#03a9f4":"initial"}} href="/myaccount/orders">Orders</Link>
          <Link style={{ textDecoration: "none", fontSize: 20, padding: 18,textAlign:"center" ,color:router.pathname==="/myaccount/wishlist"?"#03a9f4":"initial"}} href="/myaccount/wishlist">Wishlist</Link>
          <Link style={{ textDecoration: "none", fontSize: 20, padding: 18,textAlign:"center" ,color:router.pathname==="/myaccount/address"?"#03a9f4":"initial"}} href="/myaccount/address">Address</Link>
          <Button
            sx={{ p: 1, fontSize: 20, fontWeight: 600 }}
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </Button>
        </Stack>
        {router.pathname !== "/myaccount" && (
          <Box m={{ xs: "", sm: "0px 64px 0px 16px" }} width="100%">
            {" "}
            {children}
          </Box>
        )}
      </Stack>
    </Layout>
  );
};

export default MyAccount;
