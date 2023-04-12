import { createBrowserRouter, redirect } from "react-router-dom";
import App from '../App';
import Home from "../components/Home"
import { loader as homeLoader } from '../components/Home';
import Category from '../components/Category';
import ProductDetails, { productLoader } from '../components/Product/ProductDetails';
import store from '../store/store';
import Cart from '../components/checkout/Cart';
import WishList from '../components/Product/Wishlist';
import Shipping from '../components/checkout/Shipping';
import Checkout from '../components/checkout/Checkout';
import Payment from '../components/checkout/Payment';
import MyAccount from '../components/myaccount/MyAccount';
import Profile from '../components/myaccount/Profile';
import LoginPage from "../components/Auth/LoginPage";
import { getData } from "../Services/NodeService";
import Admin from "../components/Admin/Admin"
import { getCart, setBuyNow } from "../store/reducers/cart";
import Order from "../components/myaccount/Order";
import OrderDetails from "../components/myaccount/OrderDetails";

export default createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: ({ request }) => {
            if (store.getState().auth.isLoggedIn)
                store.dispatch(getCart())
            return null
        },
        children: [
            {
                path: "",
                element: <Home />,
                loader: homeLoader
            },
            {
                path: ":productName",
                element: <ProductDetails />,
                loader: productLoader,
            },
            {
                path: "category/:categoryName",
                element: <Category />,
            },
            {
                path: "search",
                element: <WishList />
            },
            {
                path: "login",
                element: <LoginPage />,
                loader: () => {
                    const { auth } = store.getState()
                    if (auth.isLoggedIn) {
                        throw window.history.back()
                    }
                    return null
                },
            },

            {
                path: "/myaccount",
                element: <MyAccount />,
                loader: ({ request }) => {
                    const { auth } = store.getState()
                    if (!auth.isLoggedIn) {
                        return redirect("/login?from=" + request.url)
                    }
                    return null
                },

                children: [
                    {
                        path: "/myaccount/profile",
                        element: <Profile />
                    },
                    {
                        path: "/myaccount/wishlist",
                        element: <WishList />,
                        loader: async () => {
                            return store.getState().auth.isLoggedIn ? await getData("wishlist") : null
                        }
                    },
                    {
                        path: "/myaccount/orders",
                        element: <Order />,
                        loader: async () => {
                            return await getData('order')
                        }
                    },
                    {
                        path: "/myaccount/address",
                        element: <h1>addresss</h1>
                    },
                    {
                        path: "/myaccount/orders/:orderId/:orderItemId",
                        element: <OrderDetails />,
                        loader: async ({ params }) => {
                            return await getData('order/' + params.orderId + "/" + params.orderItemId)
                        }
                    },
                ]
            },

        ]
    },

    {
        path: "/checkout",
        element: <Checkout />,
        loader: ({ request }) => {
            const { auth } = store.getState()
            if (!auth.isLoggedIn) {
                return redirect("/login?from=" + request.url)
            }
            if (!localStorage.getItem("bn"))
                store.dispatch(getCart())

            return null
        },
        children: [
            {
                path: "/checkout/cart",
                element: <Cart />,
            },
            {
                path: "/checkout/shipping",
                element: <Shipping />
            },
            {
                path: "/checkout/payment",
                element: <Payment />
            },
        ]
    },
    {
        path: "/admin",
        element: <Admin />,
        loader: () => {
            const { isAdmin } = store.getState().auth.user
            store.dispatch(setBuyNow(null))
            if (!isAdmin) {
                return redirect("/ ")
            }
            return null
        },
    }
])