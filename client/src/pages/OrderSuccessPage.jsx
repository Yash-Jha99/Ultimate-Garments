import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

function OrderSuccessPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/myaccount/orders", { replace: true });
    }, 10000);
  }, []);

  return (
    <Paper elevation={2}>
      <Stack
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
    </Paper>
  );
}

export default OrderSuccessPage;
