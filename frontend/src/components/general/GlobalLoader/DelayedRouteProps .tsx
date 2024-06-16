import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';





interface DelayedRouteProps {
    children: React.ReactNode;
    startLoading: () => void;
    stopLoading: () => void;
}

const DelayedRoute: React.FC<DelayedRouteProps> = ({ children, startLoading, stopLoading }) => {
    const location = useLocation();

    useEffect(() => {
        startLoading();

        const timer = setTimeout(() => {
            stopLoading();
        }, 1000); 

        return () => clearTimeout(timer);
    }, [location, startLoading, stopLoading]);

    return <>{children}</>;
};

export default DelayedRoute;