import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import useDataFetch from "./hooks/useDataFetch";
import Loader from "./components/General/Loader";
import { Box, Typography } from "@mui/material";
import Error from "./components/General/Error";

function App() {
  const { loading, error } = useDataFetch("");
  if (loading)
    return (
      <Box>
        <Loader />
        <Typography variant="h2" textAlign="center" mt={4}>
          Server is booting up
        </Typography>
      </Box>
    );

  if (error) return <Error>Something Went Wrong</Error>;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
