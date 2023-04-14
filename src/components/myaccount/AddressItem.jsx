import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDeliveryAddress } from "../../store/reducers/checkout";

const AddressItem = ({
  activeAddressId,
  defaultAddressId,
  setActiveAddress,
  item,
}) => {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{ cursor: "pointer" }}
      border={
        activeAddressId === item.id
          ? "2px solid #03a9f4"
          : "1px solid lightgray"
      }
      padding={2}
      mb={2}
      position="relative"
      onClick={() => {
        setActiveAddress(item);
        dispatch(setDeliveryAddress(item));
      }}
    >
      {item.id === defaultAddressId && (
        <Typography
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            bgcolor: "secondary.main",
            px: 1,
            color: "white",
          }}
          variant="button"
        >
          Default
        </Typography>
      )}

      <Typography fontWeight={600} variant="subtitle1" mb={1}>
        {item.firstName} {item.lastName} {"(" + item.pinCode + ")"}
      </Typography>
      <Typography variant="body2">
        {item.address}, {item.town}
      </Typography>
      <Typography variant="subtitle2">
        {item.city}, {item.state}{" "}
      </Typography>
    </Box>
  );
};

export default AddressItem;
