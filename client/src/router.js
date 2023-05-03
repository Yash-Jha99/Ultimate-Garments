import { createBrowserRouter, defer, redirect } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import store from "./store/store";
import Cart from "./components/checkout/Cart";
import WishList from "./components/myaccount/Wishlist";
import Shipping from "./components/checkout/Shipping";
import Payment from "./components/checkout/Payment";
import Profile from "./components/myaccount/Profile";
import LoginPage from "./pages/LoginPage";
import { getData } from "./services/NodeService";
import { getCart } from "./store/reducers/cart";
import Order from "./components/myaccount/Order";
import OrderDetails from "./components/myaccount/OrderDetails";
const App = await import("./App")
const Checkout = await import("./pages/Checkout")
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"))
const ProductDetails = await import("./pages/ProductDetails")
const MyAccount = await import("./pages/MyAccount")
const Error = await import("./pages/Error")
const LoginPage = await import("./pages/LoginPage")
const OrderSuccessPage = await import("./pages/OrderSuccessPage")
const OrderFailedPage = await import("./pages/OrderFailedPage")

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: ({ request }) => {
      if (store.getState().auth.isLoggedIn) store.dispatch(getCart());
      return null;
    },
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "category/:category/:subcategory",
        element: <ProductsPage />,
      },
      {
        path: ":productName",
        element: <ProductDetails />,
      },
      {
        path: "search/:search",
        element: <ProductsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        loader: () => {
          const { auth } = store.getState();
          if (auth.isLoggedIn) {
            throw window.history.back();
          }
          return null;
        },
      },
      {
        path: "/myaccount",
        element: <MyAccount />,
        loader: ({ request }) => {
          const { auth } = store.getState();
          if (!auth.isLoggedIn) {
            return redirect("/login?from=" + request.url);
          }
          return null;
        },

        children: [
          {
            path: "/myaccount/profile",
            element: <Profile />,
          },
          {
            path: "/myaccount/wishlist",
            element: <WishList />,
          },
          {
            path: "/myaccount/address",
            element: <Shipping />,
          },
          {
            path: "/myaccount/orders",
            element: <Order />,
            loader: async () => {
              const data = getData("order");
              return defer({ data });
            },
          },
          {
            path: "/myaccount/orders/success",
            element: <OrderSuccessPage />,
          },
          {
            path: "/myaccount/orders/failed",
            element: <OrderFailedPage />,
          },
          {
            path: "/myaccount/orders/:orderId/:orderItemId",
            element: <OrderDetails />,
            loader: async ({ params }) => {
              return defer({
                data: getData(
                  "order/" + params.orderId + "/" + params.orderItemId
                ),
              });
            },
          },
        ],
      },
    ],
  },

  {
    path: "/checkout",
    element: <Checkout />,
    errorElement: <Error />,
    loader: ({ request }) => {
      const { auth } = store.getState();
      if (!auth.isLoggedIn) {
        return redirect("/login?from=" + request.url);
      } else store.dispatch(getCart());

      return null;
    },
    children: [
      {
        path: "/checkout/cart",
        element: <Cart />,
      },
      {
        path: "/checkout/shipping",
        element: <Shipping />,
      },
      {
        path: "/checkout/payment",
        element: <Payment />,
      },
    ],
  },
  // {
  //   path: "/admin",
  //   element: <Admin />,
  //   errorElement: <Error />,
  //   loader: () => {
  //     const { isAdmin } = store.getState().auth.user;
  //     if (!isAdmin) {
  //       return redirect("/ ");
  //     }
  //     return null;
  //   },
  // },
]);
