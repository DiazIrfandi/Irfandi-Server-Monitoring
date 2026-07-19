import { useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";

import { useDashboard } from "../hooks/useDashboard";

import { formatBytes, formatUptime } from "../utils/format";
import SystemWidgets from "../components/dashboard/SystemWidgets";
import ContainerGrid from "../components/docker/ContainerGrid";
import { useDashboardSocket } from "../hooks/useDashboardSocket";
import ContainerDetailDrawer from "../components/docker/detail/ContainerDetailDrawer";

export default function Dashboard() {

    const {
        dashboard,
        isLoading,
    } = useDashboard();

    useDashboardSocket();

    const [query, setQuery] = useState("");

    const [
        selectedContainer,
        setSelectedContainer,
    ] = useState<string | null>(null);

    if (isLoading)
        return <>Loading...</>;

    if (!dashboard)
        return <>No Data</>;

    return (
        <>
            <DashboardHeader
                hostname={dashboard.system.system.hostname}
                os={dashboard.system.system.distro}
                cpuCores={dashboard.system.cpu.cores}
                totalRam={dashboard.system.memory.total}
                uptime={formatUptime(
                    dashboard.system.system.uptime
                )}
                query={query}
                onSearch={setQuery}
            />

            <SystemWidgets system={dashboard.system} />

            <span className="dkm-section-title">Container Docker</span>
            <ContainerGrid containers={dashboard.docker} onSelect={setSelectedContainer} />
            <ContainerDetailDrawer
                open={selectedContainer !== null}
                containerId={selectedContainer}
                onClose={() =>
                    setSelectedContainer(null)
                }
            />

            {/* Activity tetap di sini dulu */}
        </>
    );
}