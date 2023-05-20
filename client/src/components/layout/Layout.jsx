import { Stack } from "@mui/material";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import NavigationLoader from "../general/NavigationLoader";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollRestoration />
      {navigation.state === "loading" && <NavigationLoader fullscreen />}
      <Stack spacing={{ xs: 1.5, sm: 2 }}>
        <Header />
        <Outlet />
        <Footer />
      </Stack>
    </>
  );
};

export default Layout;
