import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import DefaultLayout from "../defaultLayout/DefaultLayout";
import Home from "../../pages/home/Home";
import Users from "../../pages/users/Users";
import Products from "../../pages/products/Products";
import User from "../../pages/user/User";
import Product from "../../pages/product/Product";
import GuestLayout from "../guestLayout/GuestLayout";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";



const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <GuestLayout />,
            children: [
                {
                    path: "/",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                },
            ]
        },
        {
            path: "/",
            element: <DefaultLayout />,
            children: [
                {
                    path: "/dashboard",
                    element: <Home />
                },
                {
                    path: "/users",
                    element: <Users />,
                },
                {
                    path: "/products",
                    element: <Products />,
                },
                {
                    path: "/users/:id",
                    element: <User />,
                },
                {
                    path: "/products/:id",
                    element: <Product />,
                }
            ]
        },

    ]);
    return <RouterProvider router={router} />
};

export default AppRouter;
