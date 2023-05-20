import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DeliveryDetails = ({ deliveryAddress }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        cursor: "pointer",
      }}
      border="1px solid lightgray"
      padding={2}
    >
      <Stack
        mb={1}
        justifyContent="space-between"
        alignItems="center"
        direction="row"
      >
        <Typography variant="body1">Deliver To:</Typography>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => navigate("/checkout/shipping")}
        >
          Change
        </Button>
      </Stack>
      <Typography fontWeight={500} variant="subtitle1" mb={1}>
        {deliveryAddress.firstName} {deliveryAddress.lastName}{" "}
        {"(" + deliveryAddress.pincode + ")"}
      </Typography>
      <Typography variant="body2">
        {deliveryAddress.address}, {deliveryAddress.town},{" "}
        {deliveryAddress.city}, {deliveryAddress.state}{" "}
      </Typography>
      <Typography variant="subtitle2">
        {deliveryAddress.mobileNumber}
      </Typography>
    </Box>
  );
};

export default DeliveryDetails;
