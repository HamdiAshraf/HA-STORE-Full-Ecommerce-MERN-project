import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home/HomePage";
import CategoriesPage from "../pages/categories/CategoriesPage";


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
            }
        ]
    }
])


export default router;