import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from "../../store/reducers/checkout";

const Payment = () => {
  const { paymentMethod } = useSelector((state) => state.checkout);
  const [paymentType, setPaymentType] = useState(paymentMethod ?? "");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setPaymentType(e.target.value);
    dispatch(setPaymentMethod(e.target.value));
  };

  return (
    <Box boxShadow={2} p={{ xs: 2, sm: 4 }} bgcolor="white" height="100%">
      <Typography mb={2} variant="h5">
        Select Payment Method
      </Typography>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="paymentType"
        value={paymentType}
        onChange={handleChange}
      >
        <FormControlLabel
          sx={{ pr: 4 }}
          value="Cash"
          control={<Radio color="secondary" />}
          label="Cash On Delivery"
        />
        <FormControlLabel
          value="Card"
          control={<Radio color="secondary" />}
          label="Card"
        />
      </RadioGroup>
    </Box>
  );
};

export default Payment;
