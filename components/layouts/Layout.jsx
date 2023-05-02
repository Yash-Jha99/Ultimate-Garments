import { Box, Stack } from "@mui/material";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import useInitializeStore from "@/hooks/useInitializeStore";

const Layout = ({ children }) => {
  useInitializeStore();
  return (
    <Box>
      <Stack spacing={2}>
        <Header />
        {children}
        <Footer />
      </Stack>
    </Box>
  );
};

export default Layout;
