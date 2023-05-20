import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from "react-router-dom";
import NavigationLoader from "./../general/NavigationLoader";
import CheckoutHeader from "./CheckoutHeader";
import Footer from "./Footer";
import Header from "./Header";

const ProtectedLayout = () => {
  const navigation = useNavigation();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn)
    return <Navigate to="/login" state={{ from: location.pathname }} />;

  return (
    <>
      <ScrollRestoration />
      {navigation.state === "loading" && <NavigationLoader fullscreen />}
      <Stack spacing={{ xs: 1.5, sm: 2 }}>
        {location.pathname.includes("/checkout") ? (
          <CheckoutHeader />
        ) : (
          <Header />
        )}
        <Outlet />
        <Footer />
      </Stack>
    </>
  );
};

export default ProtectedLayout;
