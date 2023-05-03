import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";

import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/system";
import LoginImage from "../../assets/login-image-final.jpg";
import { postData } from "../../services/NodeService";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/auth";
import sendOtp from "../../utils/sendOtp";
import Loader from "../general/Loader";
import { useSnackbar } from "notistack";

const Login = ({ open, handleClose }) => {
  const [showOtpPanel, setShowOtpPanel] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(null);
  const [otpTimer, setOtpTimer] = useState(0);
  const [error, setError] = useState({
    mobileNumber: false,
    name: false,
    email: false,
    otp: false,
  });

  const [formDetails, setFormDetails] = useState({
    mobileNumber: "",
    otp: "",
    name: "",
    email: "",
    notify: false,
  });

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleDialogClose = () => {
    handleClose();
    setOtpTimer(0);
    setFormDetails({
      mobileNumber: "",
      otp: "",
      name: "",
      email: "",
      notify: false,
    });
    setShowOtpPanel(false);
  };

  const handleLoginOTP = async () => {
    const { mobileNumber } = formDetails;
    if (
      mobileNumber.trim() === "" ||
      mobileNumber.trim().length !== 10 ||
      isNaN(Number(mobileNumber))
    ) {
      setError({ ...error, mobileNumber: true });
      return;
    }
    setLoading(true);
    try {
      window.otpResult = await sendOtp(mobileNumber);
      const response = await postData("auth/login", { mobileNumber });
      if (response) {
        const { isRegistered } = response.data;
        setOtpTimer(30);
        setShowOtpPanel(true);
        setShowRegisterForm(!isRegistered);
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong...", { variant: "error" });
    }
    setLoading(false);
  };

  const handleChange = async (e) => {
    const { name, value, checked } = e.target;
    error[name] = false;
    setOtpVerified(null);

    if (name === "otp" && value.length === 6) {
      setFormDetails((data) => ({ ...data, otp: value }));
      try {
        await window.otpResult.confirm(value);
        const response = await postData("auth/validate", {
          otp: value,
          mobileNumber: formDetails.mobileNumber,
        });
        if (response.status === 200) {
          setOtpVerified(true);
          response.data && dispatch(login({ token: response.data }));
        }
      } catch (error) {
        setOtpVerified(false);
      }
    }

    if (name === "mobileNumber" && showOtpPanel) {
      setShowOtpPanel(false);
      setFormDetails({
        ...formDetails,
        otp: "",
        name: "",
        email: "",
      });
    }

    let newData = { [name]: value };
    if (name === "notify") newData = { [name]: checked };
    setFormDetails((data) => ({ ...data, ...newData }));
  };

  const handleSignup = async () => {
    const { email, name, otp } = formDetails;
    if (otp.trim().length === 0 || !otpVerified)
      return setError({ ...error, otp: true });
    if (name.trim().length === 0) return setError({ ...error, name: true });
    if (email.trim().length === 0) return setError({ ...error, email: true });
    const reqBody = { ...formDetails };
    delete reqBody.otp;
    const response = await postData("user", reqBody);
    if (response.status === 400) return alert(response.data);

    dispatch(login({ token: response.data }));
    handleDialogClose();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (otpTimer > 0) setOtpTimer((data) => data - 1);
      else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  const registerPanel = (
    <>
      <TextField
        error={error.name}
        color="text"
        label="Full Name"
        margin="dense"
        required
        size="small"
        fullWidth
        value={formDetails.name}
        onChange={handleChange}
        name="name"
      />
      <TextField
        error={error.email}
        color="text"
        type="email"
        label="Email Address"
        margin="dense"
        required
        size="small"
        fullWidth
        value={formDetails.email}
        onChange={handleChange}
        name="email"
      />
      <FormControlLabel
        sx={{ fontSize: "10px" }}
        control={
          <Checkbox
            color="secondary"
            checked={formDetails.notify}
            onChange={handleChange}
            name="notify"
          />
        }
        label={
          <Typography variant="body2">
            Yes, Keep me posted with current offers, new arrivals, sale and
            contest
          </Typography>
        }
      />
    </>
  );

  return (
    <Dialog
      sx={{ width: { xs: 360, sm: 440 }, mx: "auto" }}
      open={open}
      onClose={handleDialogClose}
    >
      <img src={LoginImage} alt="login" />
      {!showOtpPanel ? (
        <DialogTitle>
          Login / Signup
          <div style={{ fontSize: 12, fontWeight: "normal" }}>
            Get Exciting Offers & Track Order
          </div>
        </DialogTitle>
      ) : (
        <DialogTitle sx={{ py: 1 }} variant="h6">
          Signup to get Started
        </DialogTitle>
      )}

      <DialogContent>
        <TextField
          error={error.mobileNumber}
          color="text"
          inputProps={{
            pattern: "[0-9]{10}",
            maxLength: 10,
          }}
          label="Phone Number"
          name="mobileNumber"
          onChange={handleChange}
          value={formDetails.mobileNumber}
          margin="dense"
          required
          size="small"
          fullWidth
        />
        {showOtpPanel ? (
          <Stack spacing={2} direction="column">
            <Box display="flex" mb={-3} justifyContent="flex-end">
              <Button
                disabled={otpTimer !== 0}
                onClick={handleLoginOTP}
                color="secondary"
              >
                Resend OTP{otpTimer !== 0 && ` in ${otpTimer} s`}
              </Button>
            </Box>
            <TextField
              error={error.otp}
              InputProps={{
                endAdornment: formDetails.otp.length === 6 && (
                  <InputAdornment position="end">
                    {otpVerified === true && <CheckCircle color="success" />}
                    {otpVerified === false && <Cancel color="error" />}
                  </InputAdornment>
                ),
              }}
              inputProps={{
                maxLength: 6,
              }}
              color="text"
              label="Enter 6 Digit OTP"
              margin="dense"
              size="small"
              fullWidth
              value={formDetails.otp}
              onChange={handleChange}
              name="otp"
            />
            {showRegisterForm && registerPanel}
            <Button
              variant="contained"
              color="info"
              fullWidth
              onClick={showRegisterForm ? handleSignup : handleDialogClose}
              disabled={!otpVerified}
            >
              {showRegisterForm ? "Sign Up" : "Submit"}
            </Button>
          </Stack>
        ) : (
          <>
            <Button
              id="sign-in-button"
              sx={{ mt: 2 }}
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleLoginOTP}
            >
              <Stack direction="row" spacing={2}>
                {loading && <Loader size={20} color="inherit" />}
                <Typography whiteSpace="nowrap">Login with OTP</Typography>
              </Stack>
            </Button>

            <Button
              sx={{
                py: 0,
                mt: 2,
                fontSize: "16px",
                fontWeight: "bold",
                color: "text.secondary",
                ":hover": { color: "text.primary", bgcolor: "white" },
              }}
              color="inherit"
              fullWidth
              onClick={handleClose}
            >
              Continue as Guest
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Login;
