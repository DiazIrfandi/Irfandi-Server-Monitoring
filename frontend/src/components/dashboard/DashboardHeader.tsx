import { Bell, Search, Server, CheckCircle2 } from "lucide-react";
import { formatBytes } from "../../utils/format";

interface TopbarProps {
    hostname: string;
    os: string;
    cpuCores: number;
    totalRam:number;
    uptime: string;
    query: string;
    onSearch: (value: string) => void;
}

export default function Topbar({
    hostname,
    os,
    cpuCores,
    totalRam,
    uptime,
    query,
    onSearch,
}: TopbarProps) {
    return (
        <div className="dkm-topbar">
            <div>
                <div className="dkm-host-title">
                    <Server
                        size={19}
                        strokeWidth={2.2}
                        color="var(--primary)"
                    />

                    {hostname}
                </div>

                <div className="dkm-host-sub">
                    <span>
                        {os} · {cpuCores} Core · {formatBytes(totalRam)} GB RAM
                    </span>

                    <span
                        className="dkm-host-pill"
                        style={{
                            color: "var(--good)",
                            background: "var(--good-soft)",
                        }}
                    >
                        <CheckCircle2
                            size={11}
                            strokeWidth={2.6}
                        />

                        Uptime {uptime}
                    </span>
                </div>
            </div>

            <div className="dkm-topbar-right">
                <div className="dkm-search">
                    <Search size={14} />

                    <input
                        value={query}
                        placeholder="Cari container..."
                        onChange={(e) =>
                            onSearch(e.target.value)
                        }
                    />
                </div>

                <div className="dkm-icon-btn">
                    <Bell size={16} />
                </div>
            </div>
        </div>
    );
}