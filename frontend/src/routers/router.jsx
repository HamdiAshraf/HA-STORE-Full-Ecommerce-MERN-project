import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home/HomePage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import SearchPage from "../pages/search/SearchPage";
import ShopPage from "../pages/shop/ShopPage";


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
            }
        ]
    }
])


export default router;