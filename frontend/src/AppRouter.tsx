import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Index from "./pages/Index"
import EditFile from "./pages/EditFile"
import ChoicePage from "./pages/ChoicePage";
import EditMenu from "./pages/EditMenu";
import Layout from "./components/general/Layout";


const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Index />, 
            },

            {
                path: 'edit_menu',
                element: <EditMenu />, 
            },

            {
                path: 'edit_page',
                element: <ChoicePage />, 
            },

            {
                path: 'edit/:file_name',
                element: <EditFile />, 
            }
        ],
    },

    
]


const router = createBrowserRouter(routes)
const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    )
}


export default AppRouter;