import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { Button, Stack, Typography } from "@mui/material";
import { updateData } from "../services/NodeService";

function OrderFailedPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const updateOrderStatus = async () => {
    await updateData("order/status/" + query.get("oid"), { status: "FAILED" });
  };

  useEffect(() => {
    updateOrderStatus();
    setTimeout(() => {
      navigate("/", { replace: true });
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

export default OrderFailedPage;
