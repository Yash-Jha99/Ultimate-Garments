import {
  Box,
  Divider,
  Stack,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import Loader from "../general/Loader";

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
          price,
          product: { image, name, handler },
          productOption: { color, size },
          order: {
            address:
            { firstName,
              lastName,
              mobileNumber,
              city,
              state,
              pincode,
              address,
              town },
            payment,
            status,
            ...orderDetail
          }
        }) => (
          <Stack spacing={{ xs: 1, sm: 2 }}>
            <Paper>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2 }}
                boxShadow={2}
                p={2}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Stack
                  direction="row"
                  width={{ xs: "100%", sm: "50%" }}
                  spacing={2}
                  pb={{ xs: 1, sm: 3 }}
                >
                  <Stack alignItems="center">
                    <Link to={`/${handler}`}>
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
                    </Link>
                  </Stack>
                  <Stack width="100%" overflow="hidden" textOverflow="ellipsis">
                    <Typography fontWeight={500} variant="body2">
                      {name}
                    </Typography>
                    <Typography
                      mb={2}
                      fontWeight="bold"
                      variant="h6"
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
                    <b>Payment Mode : </b> {payment.type}
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
                              {new Date(orderDetail[label.toLowerCase() + "At"]).toDateString().split(" ").slice(0, 3).join(" ")}
                            </Stack>
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  )}
                </Stack>
              </Stack>
            </Paper>
            <Paper>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2 }}
                boxShadow={2}
                p={2}
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
            </Paper>
          </Stack>
        )}
      </Await>
    </Suspense>
  );
};

export default OrderDetails;
