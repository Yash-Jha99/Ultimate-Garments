import Home from "@mui/icons-material/Home";
import Payment from "@mui/icons-material/Payment";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { postData } from "../../services/NodeService";
import Loader from "@/components/general/Loader";
import { addToCheckout } from "../../store/reducers/checkout";
import Logo from "@/assets/logo.png";
import ShieldSVG from "@/assets/shield.svg";
import NotFound from "@/components/general/NotFound";
import { useSnackbar } from "notistack";
import PriceDetails from "../checkout/PriceDetails";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import useInitializeStore from "@/hooks/useInitializeStore";

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

const stepRoutes = [
  "/checkout/cart",
  "/checkout/shipping",
  "/checkout/payment",
];

const Checkout = ({ children }) => {
  useInitializeStore();
  const steps = ["My Cart", "Address", "Payment"];
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    items: checkout,
    deliveryAddress,
    paymentMethod,
  } = useSelector((state) => state.checkout);

  const { items: cart } = useSelector((state) => state.cart);

  const priceDetailsRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  let checkoutItems = checkout;
  if (router.pathname === "/checkout/cart") checkoutItems = cart;

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
      router.push(stepRoutes[1]);
    }

    if (activeStep === 1) {
      if (!deliveryAddress)
        return enqueueSnackbar("Please select a address", {
          variant: "warning",
        });
      router.push(stepRoutes[2]);
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
          router.push("/myaccount/orders/success");
        } else {
          const response = await postData("payment/create-checkout-session", {
            orderItemIds: res.data.orderItemIds.map((item) => item.id),
            orderId: res.data.orderId,
          });
          if (response.status === 200) {
            window.router.replace(response.data.url);
          }
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setActiveStep(stepRoutes.indexOf(router.pathname));
  }, [router.pathname, cart]);

  return (
    <Box>
      <Box position="sticky" top={0} zIndex={100}>
        <Box mx={8} height="62px" bgcolor="white">
          <AppBar component="nav" color="inherit">
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Stack
                width="100%"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={{ xs: 0, sm: 4 }}
                mx={{ xs: 1, sm: 5 }}
              >
                <Link href="/">
                  <Image src={Logo} alt="Ultimate Garments" width={80} />
                </Link>
                <Stack
                  width={{ xs: 170, sm: "initial" }}
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                >
                  <Image width={50} src={ShieldSVG} alt="" />
                  <Typography
                    fontWeight={500}
                    fontSize={{ xs: 14, sm: 24 }}
                    variant="h5"
                  >
                    100% SECURE PAYMENT
                  </Typography>
                </Stack>
              </Stack>
            </Toolbar>
          </AppBar>
        </Box>
      </Box>

      {loading ? (
        <Loader fullscreen />
      ) : (
        <>
          {checkoutItems.length === 0 && cart.length === 0 && (
            <Box textAlign="center">
              <NotFound message="Your cart is empty" />
              <Button
                sx={{ mt: -25 }}
                variant="contained"
                size="large"
                color="secondary"
                onClick={() => router.push("/")}
              >
                Start Shopping
              </Button>
            </Box>
          )}
          {(checkoutItems.length !== 0 || cart.length !== 0) && (
            <>
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
                    <StepLabel StepIconComponent={CustomStepIcon}>
                      {step}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Stack
                mx={{ xs: 0, sm: 10 }}
                mb={{ xs: 1, sm: 0 }}
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 6 }}
                alignItems={{ xs: "center", sm: "flex-start" }}
                justifyContent="center"
              >
                <Stack mb={{ xs: 0, sm: 2 }} width={{ xs: "100%", sm: "70%" }}>
                  {children}
                </Stack>

                <Stack
                  spacing={{ xs: 1, sm: 2 }}
                  width={{ xs: "95%", sm: "30%" }}
                  boxShadow={2}
                  p={{ xs: 1, sm: 3 }}
                  bgcolor="white"
                  position={{ xs: "static", sm: "sticky" }}
                  top={75}
                >
                  {router.pathname === "/checkout/payment" && (
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
                          onClick={() => router.push("/checkout/shipping")}
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
                  <Box ref={priceDetailsRef}>
                    <PriceDetails
                      itemsCount={checkoutItems.length}
                      totalDiscount={totalDiscount}
                      totalAmount={totalAmount}
                    />
                  </Box>
                  <Button
                    sx={{
                      p: 1,
                      fontSize: 20,
                      display: { xs: "none", sm: "initial" },
                    }}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
                    onClick={handleCheckout}
                  >
                    CHECKOUT SECURELY
                  </Button>
                </Stack>
              </Stack>
              <Stack
                bgcolor="white"
                boxShadow={4}
                zIndex={20}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                px={3}
                py={1}
                display={{ xs: "flex", sm: "none" }}
                position="sticky"
                bottom={0}
              >
                <Stack justifyContent="center">
                  <Typography lineHeight={1} fontWeight={500} fontSize={18}>
                    ₹{totalAmount}
                  </Typography>
                  <Button
                    sx={{
                      p: 0,
                      fontWeight: 400,
                      fontSize: 13,
                      textTransform: "initial",
                    }}
                    color="secondary"
                    onClick={() =>
                      priceDetailsRef?.current.scrollIntoView({
                        behaviour: "smooth",
                        block: "start",
                      })
                    }
                  >
                    View price details
                  </Button>
                </Stack>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleCheckout}
                >
                  CHECKOUT SECURELY
                </Button>
              </Stack>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Checkout;
