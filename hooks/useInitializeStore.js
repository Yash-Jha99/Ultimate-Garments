import { initializeUser } from "@/store/reducers/auth";
import { getCart } from "@/store/reducers/cart";
import { initializeCheckout } from "@/store/reducers/checkout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useInitializeStore = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const deliveryAddress = localStorage?.getItem("da");
    const items = localStorage?.getItem("ck");
    if (deliveryAddress || items)
      dispatch(
        initializeCheckout({
          deliveryAddress: JSON.parse(deliveryAddress),
          items: JSON.parse(items),
        })
      );
    if (token) dispatch(initializeUser({ token }));
    dispatch(getCart());
  }, []);
};

export default useInitializeStore;
