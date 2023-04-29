import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import Footer from "./components/Footer";

function App() {
  return (
    <Stack spacing={2}>
      <Header />
      <Outlet />
      <Footer />
    </Stack>
  );
}

export default App;
