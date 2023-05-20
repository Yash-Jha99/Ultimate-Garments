/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Cart from "./components/checkout/Cart";
import Payment from "./components/checkout/Payment";
import Shipping from "./components/checkout/Shipping";
import Layout from "./components/layout/Layout";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import Order from "./components/myaccount/Order";
import OrderDetails from "./components/myaccount/OrderDetails";
import Profile from "./components/myaccount/Profile";
import WishList from "./components/myaccount/Wishlist";
import {
  loginLoader,
  orderDetailsLoader,
  ordersLoader,
  productDetailsLoader,
  productsLoader,
} from "./loaders";
import Error from "./pages/Error";
import Home from "./pages/Home";
import OrderFailedPage from "./pages/OrderFailedPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
        loader: loginLoader,
      },
      {
        path: ":handler",
        element: <ProductDetails />,
        loader: productDetailsLoader,
      },
      {
        path: "search/:search",
        element: <ProductsPage />,
        loader: productsLoader,
      },
      {
        path: "products/:category/:subcategory",
        element: <ProductsPage />,
        loader: productsLoader,
      },
    ],
  },

  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/myaccount",
        element: <MyAccount />,
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
            loader: ordersLoader,
          },
          {
            path: "/myaccount/order/success",
            element: <OrderSuccessPage />,
          },
          {
            path: "/myaccount/order/failed",
            element: <OrderFailedPage />,
          },
          {
            path: "/myaccount/order_details",
            element: <OrderDetails />,
            loader: orderDetailsLoader,
          },
        ],
      },
      {
        path: "/checkout",
        element: <Checkout />,
        errorElement: <Error />,
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
    ],
  },
]);

export default router;
