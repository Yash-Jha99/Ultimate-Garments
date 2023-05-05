import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const PriceDetails = ({ itemsCount, totalDiscount, totalAmount }) => {
  const location = useLocation();
  return (
    <Stack spacing={{ xs: 1, sm: 1.5 }}>
      <Typography variant="h6" >
        PRICE DETAILS ({itemsCount} items)
      </Typography>
      <Divider />
      {location.pathname === "/checkout/payment" ? (
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Typography variant="body2">Total Price</Typography>
          <Typography variant="body2">₹{totalAmount}</Typography>
        </Stack>
      ) : (
        <>
          <Stack spacing={1} direction="row" justifyContent="space-between">
            <Typography variant="body2">Total MRP (Inc. of Taxes)</Typography>
            <Typography variant="body2">
              ₹{totalAmount + totalDiscount}
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row" justifyContent="space-between">
            <Typography variant="body2">Discount</Typography>
            <Typography variant="body2">- ₹{totalDiscount}</Typography>
          </Stack>
        </>
      )}
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Typography variant="body2">Shipping</Typography>
        <Typography variant="body2">Free</Typography>
      </Stack>
      <Divider />
      <Stack
        spacing={1}
        direction="row"
        justifyContent="space-between"
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
        bgcolor="success.light"
        p={0.5}
        textAlign="center"
      >
        You Saved ₹{totalDiscount} on this order
      </Typography>
    </Stack>
  );
};

export default PriceDetails;
