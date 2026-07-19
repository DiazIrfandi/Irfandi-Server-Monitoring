import { useState, useEffect } from "react";
import { useContainer } from "../../../hooks/useContainer";
import LogsTab from "./tabs/LogsTab";

interface ContainerDetailDrawerProps {
    open: boolean;
    containerId: string | null;
    onClose: () => void;
}

interface UptimeDisplayProps {
    startedAt?: string | null; // Bisa string, null, atau undefined
}

const UptimeDisplay: React.FC<UptimeDisplayProps> = ({ startedAt }) => {
    const [uptime, setUptime] = useState('');

    useEffect(() => {
        if (!startedAt) {
            setUptime('Not running');
            return;
        }

        // Fungsi hitung (sama seperti di atas)
        const calculate = () => {
            const start = new Date(startedAt).getTime();
            const now = Date.now();
            const diff = Math.floor((now - start) / 1000);

            if (diff < 0) return "Starting...";

            const d = Math.floor(diff / 86400);
            const h = Math.floor((diff % 86400) / 3600);
            const m = Math.floor((diff % 3600) / 60);
            const s = Math.floor(diff % 60);

            const parts = [];
            if (d > 0) parts.push(`${d}d`);
            if (h > 0) parts.push(`${h}h`);
            if (m > 0) parts.push(`${m}m`);
            parts.push(`${s}s`);

            return parts.join(' ');
        };

        // Set state pertama kali
        setUptime(calculate());

        // Update setiap 1 detik
        const intervalId = setInterval(() => {
            setUptime(calculate());
        }, 1000);

        // Bersihkan interval saat komponen di-unmount
        return () => clearInterval(intervalId);
    }, [startedAt]);

    return <span>Up {uptime}</span>;
};

export default function ContainerDetailDrawer({
    open,
    containerId,
    onClose,
}: ContainerDetailDrawerProps) {
    const {
        data: container,
        isLoading,
        isError,
    } = useContainer(containerId, open && containerId !== null);

    const [tab, setTab] = useState<
            "overview" |
            "logs" |
            "inspect"
        >("overview");

    // Close on Escape for a proper drawer feel
    useEffect(() => {
        if (!open) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, onClose]);

    return (
        <div
            className={`dkm-drawer-overlay ${open ? "show" : ""}`}
            onClick={onClose}
        >
            <aside className="dkm-drawer" onClick={(e) => e.stopPropagation()}>
                <div className="dkm-drawer-header">
                    <h2>Container Detail</h2>
                    <button className="dkm-close-btn" onClick={onClose} aria-label="Close">
                        ✕
                    </button>
                </div>

                <div className="dkm-tabs">
                    <button
                        className={tab === "overview" ? "active" : ""}
                        onClick={() => setTab("overview")}
                    >
                        <span className="dkm-tab-icon">📊</span>
                        Overview
                    </button>

                    <button
                        className={tab === "logs" ? "active" : ""}
                        onClick={() => setTab("logs")}
                    >
                        <span className="dkm-tab-icon">📜</span>
                        Logs
                    </button>

                    <button
                        className={tab === "inspect" ? "active" : ""}
                        onClick={() => setTab("inspect")}
                    >
                        <span className="dkm-tab-icon">🔍</span>
                        Inspect
                    </button>
                </div>

                {isLoading && (
                    <div className="dkm-drawer-state">
                        <div className="dkm-spinner" />
                        <span>Loading container…</span>
                    </div>
                )}

                {!isLoading && isError && (
                    <div className="dkm-drawer-state dkm-drawer-state-error">
                        <div className="dkm-drawer-state-icon">⚠️</div>
                        <span>Failed to load container.</span>
                    </div>
                )}

                {!isLoading && !isError && container && tab === "overview" && (
                    <div className="dkm-drawer-body">
                        {/* Hero */}
                        <div className="dkm-container-hero">
                            <div className="dkm-container-hero-icon">📦</div>
                            <h2>{container.name}</h2>
                            <div className="dkm-container-image dkm-mono">
                                {container.image}
                            </div>
                            <div
                                className={`dkm-status-pill ${
                                    container.running ? "running" : "stopped"
                                }`}
                            >
                                {container.running ? "🟢 Running" : "🔴 Stopped"}
                            </div>
                        </div>

                        {/* Overview */}
                        <div className="dkm-detail-group">
                            <h4>
                                <span className="dkm-detail-group-icon">⚙️</span>
                                Overview
                            </h4>
                            <div className="dkm-detail-card">
                                <div className="dkm-detail-row">
                                    <span>Platform</span>
                                    <strong>{container.platform}</strong>
                                </div>
                                <div className="dkm-detail-row">
                                    <span>Uptime</span>
                                    {!container.running ? (
                                        <strong>
                                            Container Stopped
                                        </strong>
                                    ) : (
                                        <strong><UptimeDisplay startedAt={container.startedAt} /></strong>
                                    )
                                    }
                                </div>
                                <div className="dkm-detail-row">
                                    <span>Created</span>
                                    <strong>
                                        {new Date(container.created).toLocaleString("id-ID")}
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* Ports */}
                        <div className="dkm-detail-group">
                            <h4>
                                <span className="dkm-detail-group-icon">🔌</span>
                                Ports
                                <span className="dkm-detail-group-count">
                                    {container.ports.length}
                                </span>
                            </h4>

                            {container.ports.length === 0 ? (
                                <div className="dkm-empty">No ports exposed</div>
                            ) : (
                                <div className="dkm-detail-card">
                                    {container.ports.map((port: any) => (
                                        <div className="dkm-detail-row" key={port.privatePort}>
                                            <span className="dkm-mono">{port.privatePort}</span>
                                            {!port.bindings ? (
                                                <span className="dkm-tag dkm-tag-neutral">
                                                    Not published
                                                </span>
                                            ) : (
                                                <div className="dkm-tag-group">
                                                    {port.bindings.map((binding: any, i: number) => (
                                                        <span
                                                            key={i}
                                                            className="dkm-tag dkm-tag-port dkm-mono"
                                                        >
                                                            {binding.HostPort} → {port.privatePort}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Networks */}
                        <div className="dkm-detail-group">
                            <h4>
                                <span className="dkm-detail-group-icon">🌐</span>
                                Networks
                                <span className="dkm-detail-group-count">
                                    {container.networks.length}
                                </span>
                            </h4>

                            {container.networks.length === 0 ? (
                                <div className="dkm-empty">Not attached to any network</div>
                            ) : (
                                <div className="dkm-network-list">
                                    {container.networks.map((network: any) => (
                                        <div className="dkm-network-card" key={network.name}>
                                            <div className="dkm-network-card-top">
                                                <span className="dkm-network-dot" />
                                                <strong>{network.name}</strong>
                                            </div>
                                            <div className="dkm-network-card-meta">
                                                <span className="dkm-mono">{network.ip}</span>
                                                <span className="dkm-network-gateway">
                                                    Gateway <span className="dkm-mono">{network.gateway}</span>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mounts */}
                        <div className="dkm-detail-group">
                            <h4>
                                <span className="dkm-detail-group-icon">💾</span>
                                Mounts
                                <span className="dkm-detail-group-count">
                                    {container.mounts.length}
                                </span>
                            </h4>

                            {container.mounts.length === 0 ? (
                                <div className="dkm-empty">No mounted volumes</div>
                            ) : (
                                <div className="dkm-detail-card">
                                    {container.mounts.map((mount: any) => (
                                        <div
                                            key={mount.Name || mount.Source}
                                            className="dkm-mount-row"
                                        >
                                            <span className="dkm-mono dkm-mount-path" title={mount.Source}>
                                                {mount.Source}
                                            </span>
                                            <span className="dkm-mount-arrow">→</span>
                                            <span className="dkm-mono dkm-mount-path" title={mount.Destination}>
                                                {mount.Destination}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {!isLoading && !isError && container && tab === "logs" && (

                    <LogsTab
                        containerId={container.id}
                    />

                )}

                {!isLoading && !isError && container && tab === "inspect" && (

                    <div className="dkm-empty">

                        Coming Soon

                    </div>

                )}
            </aside>
        </div>
    );
}