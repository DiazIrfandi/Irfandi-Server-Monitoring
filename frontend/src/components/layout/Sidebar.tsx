import {
    Bell,
    Box,
    LayoutGrid,
    Layers,
    Server,
    Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menus = [

    {
        title: "Dashboard",
        path: "/",
        icon: LayoutGrid,
    },

    {
        title: "Images",
        path: "/images",
        icon: Box,
    },

    {
        title: "Volumes",
        path: "/volumes",
        icon: Layers,
    },

    {
        title: "Networks",
        path: "/networks",
        icon: Server,
    },

    {
        title: "Activity",
        path: "/activity",
        icon: Bell,
    },

    {
        title: "Settings",
        path: "/settings",
        icon: Settings,
    },

];

export default function Sidebar() {
    return (
        <aside className="dkm-sidebar">
            <div className="dkm-brand">
                <div className="dkm-brand-mark">
                    <Server size={17} strokeWidth={2.4} />
                </div>

                <div>
                    <div className="dkm-brand-title">
                        Irfandi
                    </div>

                    <div className="dkm-brand-sub">
                        Server Monitoring
                    </div>
                </div>
            </div>

            <nav className="dkm-nav">
                {menus.map((menu) => {
                    const Icon = menu.icon;

                    return (
                        <NavLink
                            key={menu.path}
                            to={menu.path}
                            className={({ isActive }) =>
                                `dkm-nav-item ${isActive ? " active" : ""}`
                            }
                        >
                            <span className="dkm-nav-item-left">
                                <Icon size={17} />
                                {menu.title}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}