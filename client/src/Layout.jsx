import Header from "./components/Header";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import { Stack } from "@mui/material";
import Loader from "./components/general/Loader";
import { Suspense, lazy } from "react"
const Footer = lazy(() => import("./components/Footer"))

const Layout = () => {
  const navigation = useNavigation()
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <>
        <ScrollRestoration />
        {navigation.state === "loading" && <Loader fullscreen />}
        <Stack spacing={{ xs: 1.5, sm: 2 }}>
          <Header />
          <Outlet />
          <Footer />
        </Stack>
      </>
    </Suspense>
  );
}

export default Layout;
