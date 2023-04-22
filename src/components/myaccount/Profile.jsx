import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Grid,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Box,
} from "@mui/material";
import { getData, updateData } from "../../Services/NodeService";
import { useSelector } from "react-redux";
import useNotify from "../../hooks/useNotify";
import useDataFetch from "../../hooks/useDataFetch";
import Loader from "../General/Loader";

const Profile = () => {
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    dob: false,
    mobileNumber: false,
    gender: false,
  });

  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    mobileNumber: "",
    gender: "",
    notify: false,
  });

  const formLabels = [
    "First Name",
    "Last Name",
    "Email Id",
    "Birth Date",
    "Phone No.",
    "Gender",
  ];

  const { id } = useSelector((state) => state.auth.user);
  const [notify, setNotify] = useNotify();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    error[name] = false;
    let newData = { [name]: value };
    if (name === "notify") newData = { [name]: checked };
    setFormDetails((data) => ({ ...data, ...newData }));
  };

  const handleSave = async () => {
    for (let key in formDetails) {
      if (key === "notify") {
        continue;
      }

      if (
        key === "mobileNumber" &&
        (isNaN(formDetails[key].trim()) ||
          formDetails[key].trim().length !== 10)
      )
        return setError((error) => ({ ...error, [key]: true }));

      if (formDetails[key].trim() === "") {
        setError((error) => ({ ...error, [key]: true }));
        return;
      }
    }

    const response = await updateData("user/" + id, formDetails);
    if (response.status === 200) setNotify("User updated succesfully");
  };

  const { loading } = useDataFetch("user/" + id, null, (data) => {
    const [firstName, lastName] = data.name.split(" ");

    setFormDetails({
      firstName,
      lastName,
      email: data.email,
      dob: data.dob ?? "",
      mobileNumber: data.mobile_number,
      gender: data.gender ?? "",
      notify: data.notify === 1,
    });
  });

  if (loading) return <Loader />;

  return (
    <Box p={{ xs: 1, sm: 4 }} bgcolor="white" boxShadow={2}>
      <FormControl>
        <Grid
          p={2}
          container
          rowSpacing={{ xs: 1.5, sm: 3 }}
          columnSpacing={{ xs: 1, sm: 4 }}
        >
          {Object.keys(formDetails).map((label, index) => {
            if (index < 5)
              return (
                <Grid key={label} item xs={index < 2 ? 6 : 12}>
                  <TextField
                    type={index === 3 ? "date" : "text"}
                    variant="standard"
                    placeholder={formLabels[index]}
                    error={error[label]}
                    color="text"
                    label={formLabels[index]}
                    required
                    fullWidth
                    value={formDetails[label]}
                    onChange={handleChange}
                    name={label}
                    disabled={index === 2}
                    focused
                  />
                </Grid>
              );
            if (index === 5)
              return (
                <Grid item key={index} xs={12}>
                  <FormLabel error={error[label]} color="secondary" required>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="gender"
                    value={formDetails[label]}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      sx={{ pr: 4 }}
                      value="female"
                      control={<Radio color="secondary" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio color="secondary" />}
                      label="Male"
                    />
                  </RadioGroup>
                </Grid>
              );

            return (
              <Grid item key={index} xs={12}>
                <FormControlLabel
                  label="I want to recieve order updates on whatsaspp"
                  control={
                    <Checkbox
                      color="secondary"
                      checked={formDetails.notify}
                      onChange={handleChange}
                      name="notify"
                    />
                  }
                />
              </Grid>
            );
          })}
        </Grid>
        {notify}
        <Button
          sx={{ mt: 2, color: "black" }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </FormControl>
    </Box>
  );
};

export default Profile;
