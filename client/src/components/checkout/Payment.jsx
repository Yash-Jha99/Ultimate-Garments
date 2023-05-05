import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Paper,
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
    <Paper sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography mb={1} variant="h5">
        Select Payment Method
      </Typography>
      <Divider />
      <RadioGroup
        sx={{ mt: 2 }}
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
    </Paper>
  );
};

export default Payment;
