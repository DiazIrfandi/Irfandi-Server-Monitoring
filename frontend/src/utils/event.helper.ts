import {
    Box,
    Container,
    HardDrive,
    Network,
    Play,
    Square,
    RotateCw,
    Trash2,
    Download,
    Plus,
    Link,
    Unlink,
    XCircle,
    AlertCircle,
    type LucideIcon,
} from "lucide-react";

export interface EventMeta {
    title: string;
    icon: LucideIcon;
    color: string;
}

export function getEventMeta(type: string, action: string): EventMeta {

    if (type === "container") {

        switch (action) {

            case "start":
                return {
                    title: "Container Started",
                    icon: Play,
                    color: "success",
                };

            case "stop":
                return {
                    title: "Container Stopped",
                    icon: Square,
                    color: "warning",
                };

            case "restart":
                return {
                    title: "Container Restarted",
                    icon: RotateCw,
                    color: "info",
                };

            case "destroy":
                return {
                    title: "Container Deleted",
                    icon: Trash2,
                    color: "danger",
                };

            case "die":
                return {
                    title: "Container Exited",
                    icon: XCircle,
                    color: "danger",
                };

            default:
                return {
                    title: action,
                    icon: Container,
                    color: "default",
                };

        }

    }

    if (type === "image") {

        switch (action) {

            case "pull":
                return {
                    title: "Image Pulled",
                    icon: Download,
                    color: "success",
                };

            case "delete":
                return {
                    title: "Image Deleted",
                    icon: Trash2,
                    color: "danger",
                };

            default:
                return {
                    title: action,
                    icon: Box,
                    color: "default",
                };

        }

    }

    if (type === "network") {

        switch (action) {

            case "connect":
                return {
                    title: "Network Connected",
                    icon: Link,
                    color: "success",
                };

            case "disconnect":
                return {
                    title: "Network Disconnected",
                    icon: Unlink,
                    color: "warning",
                };

            case "create":
                return {
                    title: "Network Created",
                    icon: Plus,
                    color: "info",
                };

            default:
                return {
                    title: action,
                    icon: Network,
                    color: "default",
                };

        }

    }

    if (type === "volume") {

        return {

            title: `Volume ${action}`,

            icon: HardDrive,

            color: "info",

        };

    }

    return {

        title: `${type} ${action}`,

        icon: AlertCircle,

        color: "default",

    };

}