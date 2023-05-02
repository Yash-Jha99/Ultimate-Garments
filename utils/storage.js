import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

const upload = async (path, file) => {
  const storageRef = ref(storage, path + "/" + file.name);
  const metadata = {
    contentType: "image/jpeg",
  };

  try {
    await uploadBytes(storageRef, file, metadata);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.log("Upload Error:", error);
    return null;
  }
};

export default upload;
