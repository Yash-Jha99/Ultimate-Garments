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
    const { status } = await deleteData("address/" + id);
  };

  const handleUpdate = async (id) => {
    if (!validateForm()) return;
    const { status } = await updateData("address/" + editId, formDetails);
    if (status === 200) {
      setShowForm(false);
      resetForm();
    }
  };

  const handleEdit = (id) => {
    setShowForm(true);
    setEditId(id);
    const temp = { ...address.find((item) => item.id === id) };
    temp["isDefault"] = temp.id === temp.defaultAddressId;
    delete temp.id;
    delete temp.user_id;
    delete temp.defaultAddressId;
    setFormDetails(temp);
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
        if (!deliveryAddress && location.pathname === "/checkout/shipping") {
          setActiveAddress(activeAddress);
          dispatch(setDeliveryAddress(activeAddress));
        } else setActiveAddress(deliveryAddress);
      }
    })();
  }, [location]);

  if (loading) return <Loader />;

  return (
    <Box boxShadow={2} p={2} bgcolor="white">
      {showForm || address.length === 0 ? (
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
          <Typography mb={2} variant="h6">
            Select Address
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
