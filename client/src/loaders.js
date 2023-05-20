import { defer, redirect } from "react-router-dom";
import { getData } from "./services/NodeService";
import { getAuth } from "./store/reducers/auth";

export const myAccountLoader = ({ request }) => {
  const { isLoggedIn } = getAuth();
  if (!isLoggedIn) {
    return redirect("/login", { headers: { from: request.url } });
  }
  return null;
};

export const loginLoader = () => {
  const auth = getAuth();
  if (auth.isLoggedIn) {
    throw window.history.back();
  }
  return null;
};

export const checkoutLoader = ({ request }) => {
  const { auth } = getAuth();
  if (!auth.isLoggedIn) {
    return redirect("/login", { headers: { from: request.url } });
  }
  return null;
};

export const productsLoader = async ({ params }) => {
  const urls = ["product", "product/options/size", "product/options/color"];
  const [products, size, color] = await Promise.all(
    urls.map((url) => getData(url, { ...params, pageSize: 12 }))
  );
  if (products) return { products, filters: { size, color } };
  else return { products: [], filters: { size: [], color: [] } };
};

export const productDetailsLoader = async ({ params }) => {
  const product = await getData(`product/${params.handler}`);
  if (product) return { product };
  else return { product: {} };
};

export const orderDetailsLoader = async ({ request }) => {
  const query = new URLSearchParams(request.url.split("?")[1]);
  const data = getData(
    `order/${query.get("order_id")}/${query.get("item_id")}`
  );
  return defer({ data });
};

export const ordersLoader = async () => {
  const data = getData("order");
  return defer({ data });
};
