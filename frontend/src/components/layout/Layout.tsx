import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../styles/dashboard.css";

export default function Layout() {
    return (
        <>
            <Sidebar />

            <main className="dkm-main">
                <Outlet />
            </main>
        </>
    );
}