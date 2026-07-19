import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Dashboard from "../pages/Dashboard";
import Images from "../pages/Images";
import Volumes from "../pages/Volumes";
import Networks from "../components/docker/Networks";
import Activity from "../pages/Activity";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "images",
                element: <Images />,
            },
            {
                path: "volumes",
                element: <Volumes />,
            },
            {
                path: "networks",
                element: <Networks />,
            },
            {
                path: "activity",
                element: <Activity />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
        ],
    },
]);