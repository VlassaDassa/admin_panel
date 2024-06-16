import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useCallback, useState } from 'react';

import Index from "./pages/Index"
import EditFile from "./pages/EditFile"
import ChoicePage from "./pages/ChoicePage";
import EditMenu from "./pages/EditMenu";
import Layout from "./components/general/Layout";
import DelayedRoute from "./components/general/GlobalLoader/DelayedRouteProps ";
import GlobalLoader from "./components/general/GlobalLoader/GlobalLoader";
import EditColors from './pages/EditColors';




export const useLoader = () => {
    const [loading, setLoading] = useState(true);

    const startLoading = useCallback(() => setLoading(true), []);
    const stopLoading = useCallback(() => setLoading(false), []);

    return { loading, startLoading, stopLoading };
};


const AppRouter: React.FC = () => {
    const { loading, startLoading, stopLoading } = useLoader();

    return (
        <Router>
            {loading && <GlobalLoader />}
            <Routes>
                <Route
                    path="/"
                    element={
                        <DelayedRoute startLoading={startLoading} stopLoading={stopLoading}>
                            <Layout />
                        </DelayedRoute>
                    }
                >
                    <Route
                        index
                        element={
                            <DelayedRoute startLoading={startLoading} stopLoading={stopLoading}>
                                <Index />
                            </DelayedRoute>
                        }
                    />
                    <Route
                        path="edit_menu"
                        element={
                            <DelayedRoute startLoading={startLoading} stopLoading={stopLoading}>
                                <EditMenu />
                            </DelayedRoute>
                        }
                    />
                    <Route
                        path="edit_page"
                        element={
                            <DelayedRoute startLoading={startLoading} stopLoading={stopLoading}>
                                <ChoicePage />
                            </DelayedRoute>
                        }
                    />
                    <Route
                        path="edit/:file_name"
                        element={
                            <DelayedRoute startLoading={startLoading} stopLoading={stopLoading}>
                                <EditFile />
                            </DelayedRoute>
                        }
                    />

                    <Route
                        path="edit_colors"
                        element={
                            <DelayedRoute startLoading={startLoading} stopLoading={stopLoading}>
                                <EditColors />
                            </DelayedRoute>
                        }
                    />

                    {/* <Route
                        path="edit_contact_footer"
                        element={
                            <DelayedRoute startLoading={startLoading} stopLoading={stopLoading}>
                                <EditFile />
                            </DelayedRoute>
                        }
                    /> */}
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;