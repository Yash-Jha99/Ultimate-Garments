/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedLayout from "./components/layout/ProtectedLayout";
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
const Cart = lazy(() => import("./components/checkout/Cart"));
const Payment = lazy(() => import("./components/checkout/Payment"));
const Shipping = lazy(() => import("./components/checkout/Shipping"));
const Order = lazy(() => import("./components/myaccount/Order"));
const OrderDetails = lazy(() => import("./components/myaccount/OrderDetails"));
const Profile = lazy(() => import("./components/myaccount/Profile"));
const WishList = lazy(() => import("./components/myaccount/Wishlist"));
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
