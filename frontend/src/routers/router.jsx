import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home/HomePage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import SearchPage from "../pages/search/SearchPage";
import ShopPage from "../pages/shop/ShopPage";
import SingleProductPage from "../pages/shop/productDetails/SingleProductPage";
import Login from "../components/Login";
import Register from "../components/Register";


const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
            {
                path:"/",
                element:<HomePage/>
            },
            {
                path:"/categories/:categoryName",
                element:<CategoriesPage />
            },{
                path:"/search",
                element:<SearchPage />
            },
            {
                path:"/shop",
                element:<ShopPage />
            },
            {
                path:"/shop/:id",
                element:<SingleProductPage />
            }
        ]
    },
    {
        path:"/login",
        element:<Login />
    },
    {
        path:"/register",
        element:<Register />
    }
])


export default router;