import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useState } from "react";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <Box>
      <Typography mb={2} variant="h5">
        Select Payment Method
      </Typography>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="paymentMethod"
        value={paymentMethod}
        onChange={handleChange}
      >
        <FormControlLabel
          sx={{ pr: 4 }}
          value="Cash On Delivery"
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
