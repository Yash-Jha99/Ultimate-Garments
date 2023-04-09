import { Home, Payment, ShoppingCart } from "@mui/icons-material";
import { Button, Typography, Stepper, Step, StepLabel } from "@mui/material";
import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StepIcon = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    background: theme.palette.secondary.main,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    background: theme.palette.secondary.main,
  }),
}));

function CustomStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ShoppingCart />,
    2: <Home />,
    3: <Payment />,
  };

  return (
    <StepIcon ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </StepIcon>
  );
}

const Checkout = () => {
  const steps = ["My Cart", "Address", "Payment"];
  const stepRoutes = [
    "/checkout/cart",
    "/checkout/shipping",
    "/checkout/payment",
  ];
  const [activeStep, setActiveStep] = useState(0);
  const { items, deliveryAddress, buyNow } = useSelector((state) => state.cart);
  const cart = buyNow ?? items;
  const location = useLocation();
  const navigate = useNavigate();

  const totalAmount = cart
    .map((product) => product.price * product.quantity)
    .reduce((total, price) => total + price, 0);

  const totalDiscount = cart
    .map(
      (product) =>
        Math.ceil((product.price * product.discount) / 100) * product.quantity
    )
    .reduce((total, discount) => total + discount, 0);

  useEffect(() => {
    setActiveStep(stepRoutes.indexOf(location.pathname));
  }, [location.pathname]);

  return (
    <Box>
      <Stepper
        sx={{ my: { xs: 2, sm: 2 }, mx: { xs: 1, sm: 8 } }}
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel StepIconComponent={CustomStepIcon}>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        p={{ xs: 1, sm: 3 }}
        mx={{ xs: 1, sm: 10 }}
        bgcolor="white"
        minHeight="70vh"
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 6 }}
          alignItems={{ xs: "center", sm: "flex-start" }}
          justifyContent="center"
        >
          <Stack
            spacing={2}
            width={{ xs: "100%", sm: "70%" }}
            p={{ xs: 1, sm: 2 }}
          >
            <Outlet />
          </Stack>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            pb={{ xs: 2, sm: 0 }}
            width={{ xs: "100%", sm: "30%" }}
          >
            {location.pathname === "/checkout/payment" && (
              <Box
                sx={{
                  cursor: "pointer",
                }}
                border="1px solid lightgray"
                padding={2}
                mb={2}
              >
                <Stack
                  mb={1}
                  justifyContent="space-between"
                  alignItems="center"
                  direction="row"
                >
                  <Typography variant="body1">Deliver To:</Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => navigate("/checkout/shipping")}
                  >
                    Change
                  </Button>
                </Stack>
                <Typography fontWeight={500} variant="subtitle1" mb={1}>
                  {deliveryAddress.firstName} {deliveryAddress.lastName}{" "}
                  {"(" + deliveryAddress.pinCode + ")"}
                </Typography>
                <Typography variant="body2">
                  {deliveryAddress.address}, {deliveryAddress.town},{" "}
                  {deliveryAddress.city}, {deliveryAddress.state}{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {deliveryAddress.mobileNumber}
                </Typography>
              </Box>
            )}
            <Typography variant="h6" borderBottom="1px solid lightgray" pb={1}>
              PRICE DETAILS ({cart.length} items)
            </Typography>
            {location.pathname === "/checkout/payment" ? (
              <Stack spacing={2} direction="row" justifyContent="space-between">
                <Typography variant="body2">Total Price</Typography>
                <Typography variant="body2">₹{totalAmount}</Typography>
              </Stack>
            ) : (
              <>
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body2">
                    Total MRP (Inc. of Taxes)
                  </Typography>
                  <Typography variant="body2">
                    ₹{totalAmount + totalDiscount}
                  </Typography>
                </Stack>
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body2">Discount</Typography>
                  <Typography variant="body2">- ₹{totalDiscount}</Typography>
                </Stack>
              </>
            )}

            <Stack spacing={2} direction="row" justifyContent="space-between">
              <Typography variant="body2">Shipping</Typography>
              <Typography variant="body2">Free</Typography>
            </Stack>
            <Stack
              spacing={2}
              direction="row"
              borderTop="1px solid lightgray"
              justifyContent="space-between"
              pt={1}
            >
              <Typography fontWeight={500} variant="body1">
                {location.pathname === "/checkout/payment"
                  ? "Amount Payable"
                  : "Total Amount"}
              </Typography>
              <Typography fontWeight={500} variant="body1">
                ₹{totalAmount}
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              color="white"
              bgcolor="success.main"
              p={0.5}
              textAlign="center"
            >
              You Saved ₹{totalDiscount} on this order
            </Typography>
            <Button
              sx={{ p: 1, fontSize: 20 }}
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              onClick={() => {
                if (activeStep === 0) navigate(stepRoutes[1]);
                if (activeStep === 1) navigate(stepRoutes[2]);
                if (activeStep === 2) alert("Payment");
              }}
            >
              CHECKOUT SECURELY
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Checkout;
