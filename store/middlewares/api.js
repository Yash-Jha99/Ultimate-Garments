import axios from "@/config/axios";

export const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== "api/callBegin") return next(action);

    const { url, method, data, onSuccess, onError } = action.payload;

    next(action);
    try {
      const response = await axios.request({
        url,
        method,
        data,
      });

      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (err) {
      if (onError) dispatch({ type: onError, payload: err.message });
    }
  };
