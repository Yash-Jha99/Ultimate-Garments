import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "../store/reducers/cart";

const useInitializeStore = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token)
      dispatch(getCart());
  }, []);
};

export default useInitializeStore;
