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
                path: "/adminn",
                element: <Admin />,
            },
        ]
    },
]);

export default router;