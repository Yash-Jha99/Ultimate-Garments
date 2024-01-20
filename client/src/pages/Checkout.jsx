import Home from "@mui/icons-material/Home";
import Payment from "@mui/icons-material/Payment";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import emptyCartImage from "../assets/empty-cart.png";
import DeliveryDetails from "../components/checkout/DeliveryDetails";
import PriceDetails from "../components/checkout/PriceDetails";
import Loader from "../components/general/Loader";
import NotFound from "../components/general/NotFound";
import { postData } from "../services/NodeService";
import { addToCheckout } from "../store/reducers/checkout";
import { getCart } from "../store/reducers/cart";

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

const Checkout = () => {
  const steps = ["My Cart", "Address", "Payment"];
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    items: checkout,
    deliveryAddress,
    paymentMethod,
  } = useSelector((state) => state.checkout);

  const { items: cart, loading: cartLoading } = useSelector(
    (state) => state.cart
  );

  const priceDetailsRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  let checkoutItems = checkout;
  if (location.pathname === "/checkout/cart") checkoutItems = cart;

  const totalAmount = checkoutItems
    .map((item) => item.product.price * item.quantity)
    .reduce((total, price) => total + price, 0);

  const totalDiscount = checkoutItems
    .map(
      (item) =>
        Math.ceil((item.product.price * item.product.discount) / 100) *
        item.quantity
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
          id: item.product.id,
          price: item.product.price,
          quantity: item.quantity,
          optionId: item.option.id,
        })),
        paymentType: paymentMethod,
        addressId: deliveryAddress.id,
      };
      setLoading(true);
      const res = await postData("order", reqBody1);
      if (res.status === 201) {
        if (paymentMethod === "Cash") {
          dispatch(getCart());
          navigate("/myaccount/order/success");
        } else {
          const response = await postData("payment/create-checkout-session", {
            orderItemIds: res.data.orderItemIds,
            orderId: res.data.orderId,
          });
          if (response.status === 200) {
            window.location.replace(response.data.url);
          }
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setActiveStep(stepRoutes.indexOf(location.pathname));
  }, [location.pathname]);

  return (
    <Box>
      {loading && <Loader fullscreen />}
      {!cartLoading && checkoutItems.length === 0 && cart.length === 0 && (
        <Box textAlign="center">
          <NotFound message="Your cart is empty" image={emptyCartImage} />
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
                <StepLabel StepIconComponent={CustomStepIcon}>{step}</StepLabel>
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
              <Outlet />
            </Stack>
            <Paper sx={{ width: { xs: "100%", sm: "30%" } }}>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                p={{ xs: 1, sm: 3 }}
                position={{ xs: "static", sm: "sticky" }}
                top={75}
              >
                {location.pathname === "/checkout/payment" && (
                  <DeliveryDetails deliveryAddress={deliveryAddress} />
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
            </Paper>
          </Stack>
          <Paper
            sx={{
              position: "fixed",
              width: "100vw",
              bottom: 0,
              display: { xs: "flex", sm: "none" },
            }}
            elevation={4}
          >
            <Stack
              zIndex={20}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              px={2}
              pt={1}
              pb={2}
              width="100%"
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
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Checkout;
