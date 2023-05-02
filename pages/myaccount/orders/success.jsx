import React, { useEffect } from "react";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import wrapper from "@/store/store";

function OrderSuccessPage() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/myaccount/orders", { replace: true });
    }, 10000);
  }, []);

  return (
    <Box>
      <Stack
        boxShadow={2}
        bgcolor="white"
        spacing={2}
        height="86vh"
        justifyContent="center"
        alignItems="center"
      >
        <TaskAltIcon sx={{ fontSize: 150 }} color="success" />
        <Stack>
          <Typography textAlign="center" fontWeight="medium" variant="h4">
            Your Order is Confirmed !
          </Typography>
          <Typography textAlign="center" color="GrayText" variant="h6">
            Thanks For Your Order
          </Typography>
        </Stack>
        <Button
          sx={{ color: "black" }}
          variant="contained"
          color="primary"
          onClick={() => navigate("/myaccount/orders", { replace: true })}
        >
          My Orders
        </Button>
      </Stack>
    </Box>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ res, req }) => {
      const { token } = store.getState().auth;
      if (!token) {
        res.setHeader("Location", "/login?from=" + req.url);
        res.statusCode = 302;
        res.end();
      }
      return { props: {} };
    }
);

export default OrderSuccessPage;
