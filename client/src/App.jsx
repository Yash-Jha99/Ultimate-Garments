/* eslint-disable react-refresh/only-export-components */
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";

import NavigationLoader from "./components/general/NavigationLoader";
import "./globals.css";
import useInitializeStore from "./hooks/useInitializeStore";
import router from "./router";
import themeConfig from "./theme";

const App = () => {
  useInitializeStore();
  const { darkMode } = useSelector((state) => state.theme);
  const theme = useMemo(
    () =>
      createTheme({
        ...themeConfig,
        palette: {
          ...themeConfig.palette,
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        autoHideDuration={3000}
      >
        <Box bgcolor={darkMode ? "#161616" : "#f1f3f6"} minHeight="100vh">
          <Suspense fallback={<NavigationLoader fullscreen />}>
            <RouterProvider router={router} />
          </Suspense>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
