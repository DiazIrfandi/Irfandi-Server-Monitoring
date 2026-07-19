import { Box, Network, Database, Activity } from "lucide-react";
import type { DockerEvent } from "../../../types/docker-event";

interface Props {
    event: DockerEvent;
}

const TYPE_META: Record<string, { icon: typeof Box; className: string }> = {
    container: { icon: Box, className: "container" },
    network: { icon: Network, className: "network" },
    volume: { icon: Database, className: "volume" },
};

const ACTION_TONE: Record<string, string> = {
    start: "good",
    create: "good",
    pull: "good",
    connect: "info",
    mount: "info",
    tag: "info",
    disconnect: "neutral",
    unmount: "neutral",
    stop: "bad",
    die: "bad",
    kill: "bad",
    destroy: "bad",
    remove: "bad",
};

function getDetail(event: DockerEvent): string | null {
    const attrs = event.attributes ?? {};
    if (event.type === "container" && attrs.image) return attrs.image;
    if (event.type === "network" && attrs.type) return `${attrs.type} network`;
    if (event.type === "volume" && attrs.destination) return `→ ${attrs.destination}`;
    return null;
}

function timeAgo(seconds: number): string {
    const diff = Math.max(0, Date.now() / 1000 - seconds);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export default function ActivityCard({ event }: Props) {
    const date = new Date(event.time * 1000);
    const meta = TYPE_META[event.type] ?? { icon: Activity, className: "default" };
    const Icon = meta.icon;
    const tone = ACTION_TONE[event.action] ?? "neutral";
    const detail = getDetail(event);

    return (
        <div className="dkm-activity-card">
            <div className={`dkm-activity-icon ${meta.className}`}>
                <Icon size={16} />
            </div>

            <div className="dkm-activity-body">
                <div className="dkm-activity-top">
                    <span className="dkm-activity-name">{event.name}</span>
                    <span className={`dkm-activity-badge ${tone}`}>{event.action}</span>
                </div>

                <div className="dkm-activity-meta">
                    <span className="dkm-activity-type">{event.type}</span>
                    {detail && <span className="dkm-mono dkm-activity-detail">{detail}</span>}
                </div>
            </div>

            <div className="dkm-activity-time" title={date.toLocaleString("id-ID")}>
                {timeAgo(event.time)}
            </div>
        </div>
    );
}