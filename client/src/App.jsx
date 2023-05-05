/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy, useEffect, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import "./globals.css";
import { useSelector } from "react-redux";
import store from "./store/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "./theme";
import { SnackbarProvider } from "notistack";
import { createBrowserRouter, redirect } from "react-router-dom";
import { getCart } from "./store/reducers/cart";
import Home from "./pages/Home";
import Cart from "./components/checkout/Cart";
import WishList from "./components/myaccount/Wishlist";
import Shipping from "./components/checkout/Shipping";
import Payment from "./components/checkout/Payment";
import Profile from "./components/myaccount/Profile";
import Order from "./components/myaccount/Order";
import OrderDetails from "./components/myaccount/OrderDetails";
import Layout from "./Layout"
import Error from "./pages/Error"
import Loader from "./components/general/Loader";
import { orderDetailsLoader, ordersLoader, productDetailsLoader, productsLoader } from "./loaders";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderFailedPage from "./pages/OrderFailedPage";
import { CssBaseline, useMediaQuery } from "@mui/material";
import useInitializeStore from "./hooks/useInitializeStore";
const ProductsPage = lazy(() => import("./pages/ProductsPage"))
const ProductDetails = lazy(() => import("./pages/ProductDetails"))
const Checkout = lazy(() => import("./pages/Checkout"))
const MyAccount = lazy(() => import("./pages/MyAccount"))
const LoginPage = lazy(() => import("./pages/LoginPage"))

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
                element: <Suspense fallback={<Loader fullscreen />}> <LoginPage /></Suspense>,
                loader: () => {
                    const { auth } = store.getState();
                    if (auth.isLoggedIn) {
                        throw window.history.back();
                    }
                    return null;
                }
            },
            {
                path: ":handler",
                element: <Suspense fallback={<Loader fullscreen />}> <ProductDetails /></Suspense>,
                loader: productDetailsLoader
            },
            {
                path: "search/:search",
                element: <Suspense fallback={<Loader fullscreen />}><ProductsPage /> </Suspense>,
                loader: productsLoader
            },
            {
                path: "products/:category/:subcategory",
                element: <Suspense fallback={<Loader fullscreen />}> <ProductsPage /></Suspense>,
                loader: productsLoader
            },
            {
                path: "/myaccount",
                element: <Suspense fallback={<Loader fullscreen />}> <MyAccount /></Suspense>,
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
                        loader: ordersLoader
                    },
                    {
                        path: "/myaccount/order/success",
                        element: <OrderSuccessPage />
                    },
                    {
                        path: "/myaccount/order/failed",
                        element: <OrderFailedPage />
                    },
                    {
                        path: "/myaccount/order_details",
                        element: <OrderDetails />,
                        loader: orderDetailsLoader
                    },
                ],
            },
        ],
    },

    {
        path: "/checkout",
        element: <Suspense fallback={<Loader fullscreen />}> <Checkout /></Suspense>,
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
]);

const App = () => {
    useInitializeStore()
    const { darkMode } = useSelector(state => state.theme)
    const theme = useMemo(() => createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: "#f8eb27",
                light: "#f9ef52",
                dark: "ada41b",
                contrastText: "#000",
            },
            secondary: {
                main: "#03a9f4",
                light: "#35baf6",
                dark: "#0276aa",
                contrastText: "#fff",
            },
        },
        shape: {
            borderRadius: 3,
        },

        components: {
            MuiLink: {
                defaultProps: {
                    underline: "none",
                },
            },

            MuiCheckbox: {
                defaultProps: {
                    disableRipple: true,
                },
            },
            MuiMenuItem: {
                defaultProps: {
                    disableRipple: true,
                },
            },
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                    disableRipple: true,
                },
            },
            MuiPaper: {
                defaultProps: {
                    elevation: 2
                }
            }
        },
    }), [darkMode])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                autoHideDuration={3000}
            >
                <RouterProvider router={router} fallbackElement={<Loader />} />
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App
