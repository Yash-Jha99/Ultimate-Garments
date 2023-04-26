import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

function App() {
  return (
    <Stack spacing={2}>
      <Header />
      <Outlet />
    </Stack>
  );
}

export default App;
