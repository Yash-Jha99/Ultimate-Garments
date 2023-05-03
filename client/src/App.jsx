import Header from "./components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Stack } from "@mui/material";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ScrollRestoration />
      <Stack spacing={2}>
        <Header />
        <Outlet />
        <Footer />
      </Stack>
    </>
  );
}

export default App;
