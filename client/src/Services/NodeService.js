import axios, { CanceledError } from "axios";

const ServerURL = process.env.REACT_APP_SERVER_URL;

axios.defaults.headers.common["access-token"] = process.env.REACT_APP_API_KEY;

export const postData = async (url, body, isFile = false) => {
  try {
    const headers = {
      headers: {
        "content-type": isFile ? "multipart/form-data" : "application/json",
      },
    };

    const response = await axios.post(`${ServerURL}/${url}`, body, headers);
    return response;
  } catch (error) {
    console.log("[POST] Error: ", error?.response?.data);
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

    const response = await axios.put(`${ServerURL}/${url}`, body, headers);
    return response;
  } catch (error) {
    console.log("[PUT] Error: ", error.response.data);
    return error.response;
  }
};

export const getData = async (url, signal, params) => {
  try {
    const config = {
      signal,
      params,
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios.get(`${ServerURL}/${url}`, config);
    return response.data;
  } catch (error) {
    if (error instanceof CanceledError) return { canceledError: true };
    console.log("[GET] Error: ", error.response);
    return {
      status: error?.response?.status,
      data: error?.response?.data,
    };
  }
};

export const deleteData = async (url) => {
  try {
    const headers = {
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios.delete(`${ServerURL}/${url}`, headers);
    return response;
  } catch (error) {
    console.log("[Delete] Error: ", error.response.data);
    return error.response;
  }
};
