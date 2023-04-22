import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Loader from "../General/Loader";

const OrderDetails = () => {
  const { data: orderDetail } = useLoaderData();

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
                  <Typography variant="body2">{name}</Typography>
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
              <Stack width={{ xs: "100%", sm: "50%" }}>
                <Typography variant="body2">
                  <b>Ordered on : </b> {date}
                </Typography>
                <Typography variant="body2">
                  <b>Payment Type : </b> {paymentType}
                </Typography>
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
                <Typography mt={1}>Mobile Number</Typography>
                <Typography variant="body2">{mobileNumber}</Typography>
              </Box>
            </Stack>
          </Stack>
        )}
      </Await>
    </Suspense>
  );
};

export default OrderDetails;
