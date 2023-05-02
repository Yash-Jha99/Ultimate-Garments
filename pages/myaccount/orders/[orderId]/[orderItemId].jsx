import {
  Box,
  Divider,
  Stack,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import Loader from "@/components/general/Loader";
import { useRouter } from "next/router";
import useDataFetch from "@/hooks/useDataFetch";
import MyAccount from "@/components/layouts/MyAccount";
import Image from "next/image";
import wrapper from "@/store/store";
import ExpandMore from "@mui/icons-material/ExpandMore";

const StepIcon = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 24,
  height: 24,
  borderRadius: "50%",
  ...(ownerState.active && {
    background: theme.palette.success.light,
  }),
  ...(ownerState.completed && {
    background: theme.palette.secondary.main,
  }),
}));

function CustomStepIcon(props) {
  const { active, completed, className } = props;
  return <StepIcon ownerState={{ completed, active }} className={className} />;
}

const OrderDetails = () => {
  const { orderId, orderItemId } = useRouter().query;
  const { loading, data } = useDataFetch(`order/${orderId}/${orderItemId}`, {});
  const steps = ["Ordered", "Packed", "Shipped", "Delivered"];

  const {
    image,
    name,
    price,
    date,
    color,
    size,
    first_name: firstName,
    last_name: lastName,
    mobile_number: mobileNumber,
    city,
    state,
    pincode,
    address,
    town,
    paymentType,
    status,
    ...orderDetail
  } = data;

  return (
    <MyAccount>
      <Stack spacing={{ xs: 1, sm: 2 }}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2 }}
              boxShadow={2}
              p={2}
              bgcolor="white"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Stack
                direction="row"
                width={{ xs: "100%", sm: "50%" }}
                spacing={2}
                pb={{ xs: 1, sm: 3 }}
              >
                <Stack alignItems="center">
                  <Box
                    height={{ xs: 72, sm: 120 }}
                    width={{ xs: 72, sm: 120 }}
                    mx={{ xs: 0, sm: 2 }}
                  >
                    <Image
                      src={image}
                      alt="product"
                      style={{
                        objectFit: "contain",
                      }}
                      width={120}
                      height={120}
                    />
                  </Box>
                </Stack>
                <Stack width="100%" overflow="hidden" textOverflow="ellipsis">
                  <Typography fontWeight={500} variant="body2">
                    {name}
                  </Typography>
                  <Typography
                    mb={2}
                    fontWeight="bold"
                    variant="h6"
                    color="black"
                  >
                    ₹ {price}
                  </Typography>
                  <Typography variant="body2">
                    <b>Color : </b>
                    {color}
                  </Typography>
                  <Typography variant="body2">
                    <b>Size : </b>
                    {size}
                  </Typography>
                </Stack>
              </Stack>
              <Stack spacing={3} width={{ xs: "100%", sm: "50%" }}>
                <Typography variant="body2">
                  <b>Payment Mode : </b> {paymentType}
                </Typography>
                {status === "FAILED" ? (
                  <Typography color="error">Your order failed</Typography>
                ) : (
                  <Stepper
                    activeStep={steps.findIndex(
                      (step) => step.toLowerCase() === status.toLowerCase()
                    )}
                    alternativeLabel
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel
                          StepIconComponent={CustomStepIcon}
                          color="secondary"
                        >
                          <Stack>
                            {label}
                            <br />
                            {orderDetail[label[0].toLowerCase() + "Date"]}
                          </Stack>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                )}
              </Stack>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2 }}
              boxShadow={2}
              p={2}
              bgcolor="white"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box width={{ xs: "100%", sm: "100%" }}>
                <Typography variant="body1" fontWeight="bold">
                  Delivery Address
                </Typography>
                <Typography fontWeight={500} variant="subtitle1" mb={1}>
                  {firstName} {lastName}
                </Typography>
                <Typography variant="body2">
                  {address}, {town}
                  <br /> {city} - {pincode}, {state}{" "}
                </Typography>
                <Typography mt={1} fontWeight={500} variant="subtitle1">
                  Mobile Number : {mobileNumber}
                </Typography>
              </Box>
            </Stack>
          </>
        )}
      </Stack>
    </MyAccount>
  );
};

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

export default OrderDetails;
