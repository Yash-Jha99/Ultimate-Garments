import { Stack, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const PriceDetails = ({ itemsCount, totalDiscount, totalAmount }) => {
  const location = useLocation();
  return (
    <>
      <Typography variant="h6" borderBottom="1px solid lightgray" pb={1}>
        PRICE DETAILS ({itemsCount} items)
      </Typography>
      {location.pathname === "/checkout/payment" ? (
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Typography variant="body2">Total Price</Typography>
          <Typography variant="body2">₹{totalAmount}</Typography>
        </Stack>
      ) : (
        <>
          <Stack spacing={2} direction="row" justifyContent="space-between">
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
    </>
  );
};

export default PriceDetails;
