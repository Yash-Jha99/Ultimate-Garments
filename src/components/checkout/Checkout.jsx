import { Home, Payment, ShoppingCart } from "@mui/icons-material";
import {
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Toolbar,
  AppBar,
} from "@mui/material";
import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { postData } from "../../Services/NodeService";
import Loader from "../General/Loader";
import { addToCheckout } from "../../store/reducers/checkout";
import Logo from "../../images/logo.png";
import NotFound from "../General/NotFound";
import { useSnackbar } from "notistack";

const StepIcon = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 36,
  height: 36,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    background: theme.palette.secondary.main,
    boxShadow: "0 4px 6px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    background: theme.palette.secondary.main,
  }),
}));

function CustomStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ShoppingCart fontSize="small" />,
    2: <Home fontSize="small" />,
    3: <Payment fontSize="small" />,
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
  const [loading, setLoading] = useState(false);
  const {
    items: checkout,
    deliveryAddress,
    paymentMethod,
  } = useSelector((state) => state.checkout);

  const { items: cart } = useSelector((state) => state.cart);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  let checkoutItems = checkout;
  if (location.pathname === "/checkout/cart") checkoutItems = cart;

  const totalAmount = checkoutItems
    .map((product) => product.price * product.quantity)
    .reduce((total, price) => total + price, 0);

  const totalDiscount = checkoutItems
    .map(
      (product) =>
        Math.ceil((product.price * product.discount) / 100) * product.quantity
    )
    .reduce((total, discount) => total + discount, 0);

  const handleCheckout = async () => {
    if (activeStep === 0) {
      if (cart.some((item) => item.quantityInStock === 0))
        return enqueueSnackbar("Please remove out of stock item", {
          variant: "warning",
        });

      dispatch(addToCheckout(cart));
      navigate(stepRoutes[1]);
    }

    if (activeStep === 1) {
      if (!deliveryAddress)
        return enqueueSnackbar("Please select a address", {
          variant: "warning",
        });
      navigate(stepRoutes[2]);
    }

    if (activeStep === 2) {
      if (!paymentMethod)
        return enqueueSnackbar("Please select a payment method", {
          variant: "warning",
        });

      const reqBody1 = {
        products: checkoutItems.map((item) => ({
          cartId: item.id,
          id: item.productId,
          price: item.price,
          quantity: item.quantity,
          optionId: item.product_option_id,
        })),
        paymentType: paymentMethod,
        addressId: deliveryAddress.id,
      };
      setLoading(true);
      const res = await postData("order", reqBody1);
      if (res.status === 201) {
        if (paymentMethod === "Cash") {
          setLoading(false);
          navigate("/myaccount/orders");
        } else {
          const response = await postData("payment/create-checkout-session", {
            orderItemIds: res.data.map((item) => item.id),
          });
          if (response.status === 200) {
            window.location.replace(response.data.url);
            setLoading(false);
          } else setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    setActiveStep(stepRoutes.indexOf(location.pathname));
  }, [location.pathname]);

  if (loading) return <Loader />;

  if (checkoutItems.length === 0 && cart.length === 0)
    return (
      <Box textAlign="center">
        <NotFound message="Your cart is empty" />
        <Button
          sx={{ mt: -25 }}
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Start Shopping
        </Button>
      </Box>
    );

  return (
    <Box>
      <Box bgcolor="white" position="sticky" top={0} zIndex={100}>
        <Box mx={8} height="62px" bgcolor="white">
          <AppBar component="nav" color="inherit">
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={{ xs: 0, sm: 4 }}
                mx={5}
              >
                <Link to="/">
                  <img src={Logo} alt="Ultimate Garments" width={80} />
                </Link>
              </Stack>
            </Toolbar>
          </AppBar>
        </Box>
      </Box>
      <Stepper
        sx={{
          mb: 1,
          mt: 2,
          mx: { xs: 1, sm: 8 },
        }}
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel StepIconComponent={CustomStepIcon}>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mx={{ xs: 0, sm: 10 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 6 }}
          alignItems={{ xs: "center", sm: "flex-start" }}
          justifyContent="center"
        >
          <Stack
            minHeight={{ xs: "none", sm: "68vh" }}
            spacing={2}
            width={{ xs: "100%", sm: "70%" }}
          >
            <Outlet />
          </Stack>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            pb={{ xs: 2, sm: 0 }}
            width={{ xs: "95%", sm: "30%" }}
            boxShadow={2}
            p={{ xs: 1, sm: 3 }}
            bgcolor="white"
            position="sticky"
            top={75}
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
            {checkoutItems.length !== 0 && (
              <>
                <Typography
                  variant="h6"
                  borderBottom="1px solid lightgray"
                  pb={1}
                >
                  PRICE DETAILS ({checkoutItems.length} items)
                </Typography>
                {location.pathname === "/checkout/payment" ? (
                  <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                  >
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
                      <Typography variant="body2">
                        - ₹{totalDiscount}
                      </Typography>
                    </Stack>
                  </>
                )}
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                >
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
                  onClick={handleCheckout}
                >
                  CHECKOUT SECURELY
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Checkout;
