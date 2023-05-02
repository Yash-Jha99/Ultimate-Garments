import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../config/firebase";

const sendOtp = async (phoneNumber) => {
  const appVerifier = new RecaptchaVerifier(
    "sign-in-button",
    {
      size: "invisible",
      callback: (response) => {},
      defaultCountry: "IN",
    },
    auth
  );
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      "+91" + phoneNumber,
      appVerifier
    );
    return confirmationResult;
  } catch (error) {
    throw error;
  }
};

export default sendOtp;
