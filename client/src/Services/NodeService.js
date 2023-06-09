import axios from "../config/axios";

export const postData = async (url, body, isFile = false) => {
  try {
    const headers = {
      headers: {
        "content-type": isFile ? "multipart/form-data" : "application/json",
      },
    };

    const response = await axios.post(url, body, headers);
    return response;
  } catch (error) {
    console.log("[POST  Error]: ", error?.response?.data);
    return error.response;
  }
};

export const updateData = async (url, body, isFile = false) => {
  try {
    const headers = {
      headers: {
        "content-type": isFile ? "multipart/form-data" : "application/json",
      },
    };

    const response = await axios.put(url, body, headers);
    return response;
  } catch (error) {
    console.log("[PUT Error]: ", error.response.data);
    return error.response;
  }
};

export const getData = async (url, params = {}) => {
  try {
    const config = {
      params,
      headers: {
        "content-type": "application/json",
      },
    };
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    if (error?.response) return error.response
    else console.log("[GET Error]:", err?.response || err?.message || err)
      ;
  }
};

export const deleteData = async (url) => {
  try {
    const headers = {
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios.delete(url, headers);
    return response;
  } catch (error) {
    console.log("[DELETE Error]:", error.response.data);
    return error.response;
  }
};
