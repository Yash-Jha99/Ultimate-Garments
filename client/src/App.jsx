import Header from "./components/Header";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import { Stack } from "@mui/material";
import Loader from "./components/general/Loader";
import { Suspense, lazy } from "react";
import useInitializeStore from "./hooks/useInitializeStore";
const Footer = lazy(() => import("./components/Footer"))

function App() {
  const navigation = useNavigation()
  useInitializeStore()

  return (
    <Suspense fallback={<Loader fullscreen />}>
      <>
        <ScrollRestoration />
        {navigation.state === "loading" && <Loader fullscreen />}
        <Stack spacing={2}>
          <Header />
          <Outlet />
          <Footer />
        </Stack>
      </>
    </Suspense>
  );
}

export default App;
