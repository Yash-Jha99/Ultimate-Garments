import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const DeliveryOptions = () => {
  const [showInput, setShowInput] = useState(true);
  const [pincode, setPincode] = useState("");
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 2);

  return (
    <Box pt={1}>
      <Typography variant="h6">Delivery Options</Typography>
      <Box
        border="1px solid lightgray"
        px={2}
        py={1.5}
        width={{ xs: "90%", sm: "80%" }}
      >
        {showInput ? (
          <Typography variant="body2">
            Enter your Pincode to check the delivery time
          </Typography>
        ) : (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={-1}
            mb={1}
          >
            <Typography>
              Delivering to : <b>{pincode}</b>
            </Typography>
            <Button color="secondary" onClick={() => setShowInput(true)}>
              Change
            </Button>
          </Stack>
        )}

        {showInput ? (
          <Box width={{ xs: "100%", sm: "70%" }} my={1}>
            <TextField
              InputProps={{
                endAdornment: (
                  <Button color="secondary" onClick={() => setShowInput(false)}>
                    Check
                  </Button>
                ),
              }}
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              fullWidth
              placeholder="Enter Pincode"
              size="small"
              color="secondary"
            />
          </Box>
        ) : (
          <Typography variant="body2" fontWeight={500}>
            Delivery by &nbsp; {currentDate.toDateString()}
          </Typography>
        )}
        <Typography variant="body2">Cash On Delivery</Typography>
        <Typography variant="body2">Express Shipping</Typography>
      </Box>
    </Box>
  );
};

export default DeliveryOptions;
