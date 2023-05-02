import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChiTPHywKm2SQdklIvKASGdg5JoFduU-U",
  authDomain: "my-project-e6483.firebaseapp.com",
  projectId: "my-project-e6483",
  storageBucket: "my-project-e6483.appspot.com",
  messagingSenderId: "820754954872",
  appId: "1:820754954872:web:f12ce9b2f1e6efedb54b8d",
  measurementId: "G-800RGLMXMC",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
