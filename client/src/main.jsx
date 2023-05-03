import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { SnackbarProvider } from "notistack";
import App from "./App";
import { createBrowserRouter, defer, redirect } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./components/checkout/Cart";
import WishList from "./components/myaccount/Wishlist";
import Shipping from "./components/checkout/Shipping";
import Checkout from "./pages/Checkout";
import Payment from "./components/checkout/Payment";
import MyAccount from "./pages/MyAccount";
import Profile from "./components/myaccount/Profile";
import LoginPage from "./pages/LoginPage";
import { getData } from "./services/NodeService";
import { getCart } from "./store/reducers/cart";
import Order from "./components/myaccount/Order";
import OrderDetails from "./components/myaccount/OrderDetails";
import Error from "./components/general/Error";
import ProductsPage from "./pages/ProductsPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderFailedPage from "./pages/OrderFailedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => {
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
        path: "category/:category",
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
  // s
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          autoHideDuration={3000}
        >
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
