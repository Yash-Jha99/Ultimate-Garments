import {
  Box,
  Divider,
  Stack,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Loader from "../General/Loader";

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
  const { data: orderDetail } = useLoaderData();
  const steps = ["Ordered", "Packed", "Shipped", "Delivered"];

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={orderDetail}>
        {({
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
        }) => (
          <Stack spacing={{ xs: 1, sm: 2 }}>
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
                    <img
                      src={image}
                      alt="product"
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
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
          </Stack>
        )}
      </Await>
    </Suspense>
  );
};

export default OrderDetails;
