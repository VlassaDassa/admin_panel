import { Outlet, useLocation } from 'react-router-dom';

import Header from "./Header/Header";
import Menu from "./Menu/Menu";



const Layout = () => {
    const location = useLocation()
    const pathName = location.pathname.split('/')[1]
    const noMenuRoutes = ['edit']
    const conditionNoMenuRoute = !noMenuRoutes.includes(pathName)


    return (
        <>
            <Header />
            <div className="contentWrapper">
                {conditionNoMenuRoute ? <Menu /> : null} 
                <Outlet />
            </div>
            
        </>
    )
}

export default Layout;