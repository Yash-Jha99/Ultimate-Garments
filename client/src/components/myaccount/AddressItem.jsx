import { Box, Typography, MenuItem, Card, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDeliveryAddress } from "../../store/reducers/checkout";
import MoreVert from "@mui/icons-material/MoreVert";
import { useLocation } from "react-router-dom";
import Dropdown from "../general/Dropdown";

const AddressItem = ({
  activeAddressId,
  defaultAddressId,
  setActiveAddress,
  item,
  onEdit = null,
  onDelete = null,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const hasMenu = location.pathname === "/myaccount/address";

  return (
    <Card
      variant="outlined"
      sx={{
        cursor: "pointer",
        outline:
          activeAddressId === item.id
            ? "2px solid #03a9f4"
            : "1px solid lightgray",
        padding: 2,
        mb: 2,
        position: "relative"
      }}
      onClick={() => {
        if (
          location.pathname === "/myaccount/address" ||
          activeAddressId === item.id
        )
          return;
        setActiveAddress(item);
        dispatch(setDeliveryAddress(item));
      }}
    >
      {
        item.id === defaultAddressId && (
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
        )
      }
      {
        hasMenu && (
          <Box position="absolute" top={0} right={0}>
            <Dropdown
              // open={open}
              // onOpen={handleOpen}
              // onClose={handleClose}
              overlap
              disableArrow
              position="right"
              trigger={<MoreVert />}
            >
              <Paper>
                <MenuItem
                  sx={{ display: "block", fontSize: 14 }}
                  onClick={() => onEdit(item.id)}
                >
                  Edit
                </MenuItem>
                {item.id !== defaultAddressId && (
                  <MenuItem
                    sx={{ display: "block", fontSize: 14 }}
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </MenuItem>
                )}
              </Paper>
            </Dropdown>
          </Box>
        )
      }

      <Typography fontWeight={600} variant="subtitle1" mb={1}>
        {item.firstName} {item.lastName} {"(" + item.pincode + ")"}
      </Typography>
      <Typography variant="body2">
        {item.address}, {item.town}
      </Typography>
      <Typography variant="subtitle2">
        {item.city}, {item.state}{" "}
      </Typography>
    </Card >
  );
};

export default AddressItem;
