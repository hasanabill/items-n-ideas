import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Admin from "../pages/Admin";
import About from "../pages/About";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import AddProduct from "../pages/AddProduct";
import ProtectedRoute from "../components/ProtectedRoute";
import EditProduct from "../pages/EditProduct";
import ManageUser from "../pages/ManageUser";
import AdminLayout from "./AdminLayout";
import ManageProducts from "../pages/ManageProducts";

const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/products/:id",
                element: <ProductDetails />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/getin",
                element: <Login />,
            },
            {
                element: <ProtectedRoute isAllowed={isAuthenticated()} />,
                children: [
                    {
                        path: "/adminn",
                        element: <AdminLayout />,
                        children: [
                            {
                                path: "",
                                element: <Admin />,
                            },
                            {
                                path: "manageuser",
                                element: <ManageUser />,
                            },
                            {
                                path: "manageproducts",
                                element: <ManageProducts />,
                            },
                            {
                                path: "addproduct",
                                element: <AddProduct />,
                            },
                            {
                                path: "editproduct/:id",
                                element: <EditProduct />,
                            },
                        ]
                    },
                ]
            },
        ]
    },
]);

export default router;
