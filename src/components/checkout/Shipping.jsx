import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Grid,
  TextField,
  Stack,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryAddress } from "../../store/reducers/cart";
import { getData, postData } from "../../Services/NodeService";

const Shipping = () => {
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState([]);
  const [defaultAddressId, setDefaultAddressId] = useState("");
  const [activeAddress, setActiveAddress] = useState({});
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    mobileNumber: false,
    pinCode: false,
    town: false,
    city: false,
    state: false,
    address: false,
  });

  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    pinCode: "",
    town: "",
    city: "",
    state: "",
    address: "",
    isDefault: false,
  });

  const formLabels = [
    "First Name",
    "Last Name",
    "Phone No.",
    "PIN Code",
    "Town/Village",
    "City/District",
    "State",
    "Address (House No, Building, Street, Area)",
  ];

  const dispatch = useDispatch();
  const { deliveryAddress } = useSelector((state) => state.cart);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    error[name] = false;
    let newData = { [name]: value };
    if (name === "isDefault") newData = { [name]: checked };
    setFormDetails((data) => ({ ...data, ...newData }));
  };

  const handleAdd = async () => {
    for (let key in formDetails) {
      if (key === "isDefault") {
        delete formLabels[key];
        continue;
      }

      if (
        key === "mobileNumber" &&
        (isNaN(formDetails[key].trim()) ||
          formDetails[key].trim().length !== 10)
      )
        return setError((error) => ({ ...error, [key]: true }));

      if (
        key === "pinCode" &&
        (isNaN(formDetails[key].trim()) || formDetails[key].trim().length !== 6)
      )
        return setError((error) => ({ ...error, [key]: true }));

      if (formDetails[key].trim() === "") {
        setError((error) => ({ ...error, [key]: true }));
        break;
      }
    }

    const { status, data } = await postData("address", formDetails);
    if (status === 201) {
      setAddress([...address, { ...formDetails, id: data.id }]);
      setDefaultAddressId(data.id);
      setShowForm(false);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getData("address");
      if (data) {
        const newData = data.map((address) => ({
          id: address.id,
          firstName: address.first_name,
          lastName: address.last_name,
          mobileNumber: address.mobile_number,
          pinCode: address.pincode,
          town: address.town,
          city: address.city,
          state: address.state,
          address: address.address,
          defaultAddressId: address.defaultAddressId,
        }));
        setAddress(newData);
        setLoading(false);
        const activeAddress = newData.find(
          (address) => address.id === data[0].defaultAddressId
        );
        setDefaultAddressId(data[0].defaultAddressId);
        if (!deliveryAddress) {
          setActiveAddress(activeAddress);
          dispatch(setDeliveryAddress(activeAddress));
        } else setActiveAddress(deliveryAddress);
      }
    })();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );

  return (
    <>
      {showForm || address.length === 0 ? (
        <>
          <Grid p={2} container rowSpacing={3} columnSpacing={2}>
            {Object.keys(formDetails).map((label, index) =>
              index < 8 ? (
                <Grid key={label} item xs={12} sm={6}>
                  <TextField
                    error={error[label]}
                    color="text"
                    label={formLabels[index]}
                    required
                    size="small"
                    fullWidth
                    value={formDetails[label]}
                    onChange={handleChange}
                    name={label}
                  />
                </Grid>
              ) : (
                <Stack pt={2} direction="row" alignItems="center" key={index}>
                  <span>
                    <Checkbox
                      color="secondary"
                      checked={formDetails.isDefault}
                      onChange={handleChange}
                      name="isDefault"
                    />
                  </span>
                  <span>Make this my default address</span>
                </Stack>
              )
            )}
          </Grid>
          <Button
            variant="contained"
            color="inherit"
            fullWidth
            onClick={handleAdd}
          >
            Add Address
          </Button>
        </>
      ) : (
        <Box maxWidth={{ xs: "100%", sm: "70%" }}>
          <Typography mb={2} variant="h6">
            Select Address
          </Typography>
          {address.map((item, index) => (
            <Box
              key={index}
              sx={{ cursor: "pointer" }}
              border={
                activeAddress.id === item.id
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
                    top: 0,
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
          ))}
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="inherit"
            onClick={() => setShowForm(true)}
          >
            Add New
          </Button>
        </Box>
      )}
    </>
  );
};

export default Shipping;
