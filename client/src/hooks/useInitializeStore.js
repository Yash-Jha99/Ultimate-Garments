import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "../store/reducers/cart";
import { useMediaQuery } from "@mui/material";
import { initializeMode } from "../store/reducers/theme";

const useInitializeStore = () => {
  const dispatch = useDispatch();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  useEffect(() => {
    dispatch(initializeMode({ darkMode: prefersDarkMode }))
    const token = localStorage.getItem("token");
    if (token)
      dispatch(getCart());
  }, [prefersDarkMode]);
};

export default useInitializeStore;
