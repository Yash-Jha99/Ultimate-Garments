import React, { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryAddress } from "../../store/reducers/checkout";
import {
  deleteData,
  getData,
  postData,
  updateData,
} from "../../Services/NodeService";
import AddressForm from "../myaccount/AddressForm";
import AddressItem from "../myaccount/AddressItem";
import Loader from "../General/Loader";
import { useLocation } from "react-router-dom";

const Shipping = () => {
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState([]);
  const [defaultAddressId, setDefaultAddressId] = useState("");
  const [editId, setEditId] = useState("");
  const [activeAddress, setActiveAddress] = useState({});
  const [loading, setLoading] = useState(false);

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
  const location = useLocation();
  const { deliveryAddress } = useSelector((state) => state.checkout);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    error[name] = false;
    let newData = { [name]: value };
    if (name === "isDefault") newData = { [name]: checked };
    setFormDetails((data) => ({ ...data, ...newData }));
  };

  const resetForm = () => {
    setFormDetails({
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
  };

  const validateForm = () => {
    for (let key in formDetails) {
      if (key === "isDefault") {
        continue;
      }

      if (
        key === "mobileNumber" &&
        (isNaN(formDetails[key].trim()) ||
          formDetails[key].trim().length !== 10)
      ) {
        setError((error) => ({ ...error, [key]: true }));
        return false;
      }

      if (
        key === "pinCode" &&
        (isNaN(formDetails[key].trim()) || formDetails[key].trim().length !== 6)
      ) {
        setError((error) => ({ ...error, [key]: true }));
        return false;
      }

      if (formDetails[key].trim() === "") {
        setError((error) => ({ ...error, [key]: true }));
        return false;
      }
    }
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    const { status, data } = await postData("address", formDetails);
    if (status === 201) {
      setAddress([...address, { ...formDetails, id: data.id }]);
      setDefaultAddressId(data.id);
      setShowForm(false);
      resetForm();
    }
  };

  const handleDelete = async (id) => {
    if (defaultAddressId === id) return;
    const prevAddress = [...address];
    setAddress(address.filter((address) => address.id !== id));
    const { status } = await deleteData("address/" + id);
    if (status !== 200) {
      setAddress(prevAddress);
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    console.log(formDetails);

    const prevAddress = [...address];
    const prevDefaultAddressId = defaultAddressId;

    setAddress(
      address.map((address) =>
        address.id === editId ? { id: editId, ...formDetails } : address
      )
    );
    if (formDetails.isDefault) setDefaultAddressId(editId);
    setShowForm(false);
    const { status } = await updateData("address/" + editId, formDetails);
    if (status !== 200) {
      setAddress(prevAddress);
      setDefaultAddressId(prevDefaultAddressId);
    }
    resetForm();
  };

  const handleEdit = (id) => {
    setShowForm(true);
    setEditId(id);
    const temp = { ...address.find((item) => item.id === id) };
    if (id !== defaultAddressId) temp.isDefault = false;
    delete temp.id;
    delete temp.user_id;
    delete temp.defaultAddressId;
    setFormDetails(temp);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getData("address");
      setLoading(false);
      if (data?.length !== 0) {
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
        }));
        setAddress(newData);
        const activeAddress = newData.find(
          (address) => address.id === data[0].defaultAddressId
        );
        setDefaultAddressId(data[0].defaultAddressId);
        if (!deliveryAddress && location.pathname === "/checkout/shipping") {
          setActiveAddress(activeAddress);
          dispatch(setDeliveryAddress(activeAddress));
        } else setActiveAddress(deliveryAddress);
      }
    })();
  }, [deliveryAddress, dispatch, location]);

  if (loading) return <Loader />;

  return (
    <Box boxShadow={2} p={2} bgcolor="white">
      {showForm ||
      (address.length === 0 && location.pathname === "/checkout/shipping") ? (
        <AddressForm
          formDetails={formDetails}
          formLabels={formLabels}
          error={error}
          onChange={handleChange}
          onCancel={() => setShowForm(false)}
          onSave={editId ? handleUpdate : handleAdd}
        />
      ) : (
        <Box maxWidth={{ xs: "100%", sm: "70%" }}>
          <Typography mb={2} variant="h5">
            {location.pathname === "/checkout/shipping"
              ? "Select Address"
              : "My addresses"}
          </Typography>
          {address.map((item, index) => (
            <AddressItem
              key={index}
              onDelete={handleDelete}
              onEdit={handleEdit}
              {...{
                item,
                setActiveAddress,
                activeAddressId: activeAddress.id,
                defaultAddressId,
              }}
            />
          ))}
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="inherit"
            onClick={() => {
              setShowForm(true);
              resetForm();
            }}
          >
            Add New
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Shipping;
