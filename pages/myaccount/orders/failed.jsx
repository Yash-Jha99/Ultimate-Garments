import React, { useEffect } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Button, Stack, Typography } from "@mui/material";
import { updateData } from "../../../services/NodeService";
import { useRouter } from "next/router";
import wrapper from "@/store/store";

function OrderFailedPage() {
  const router = useRouter();
  const { oid } = router.query;

  const updateOrderStatus = async () => {
    await updateData("order/status/" + oid, { status: "FAILED" });
  };

  useEffect(() => {
    updateOrderStatus();
    setTimeout(() => {
      router.push("/", { replace: true });
    }, 10000);
  }, []);

  return (
    <Stack
      boxShadow={2}
      bgcolor="white"
      spacing={2}
      height="86vh"
      justifyContent="center"
      alignItems="center"
    >
      <ErrorIcon sx={{ fontSize: 150 }} color="error" />
      <Stack>
        <Typography textAlign="center" fontWeight="medium" variant="h4">
          Payment failed !
        </Typography>
        <Typography textAlign="center" color="GrayText" variant="h6">
          Please try again later
        </Typography>
      </Stack>
      <Button
        sx={{ color: "black" }}
        variant="contained"
        color="primary"
        onClick={() => navigate("/", { replace: true })}
      >
        Go To Homepage
      </Button>
    </Stack>
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

export default OrderFailedPage;
