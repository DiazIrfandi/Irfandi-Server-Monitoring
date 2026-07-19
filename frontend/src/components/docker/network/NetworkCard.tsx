import { Network } from "lucide-react";
import type { DockerNetwork } from "../../../types/docker";

interface NetworkCardProps {
    network: DockerNetwork;
    onClick(): void;
}

export default function NetworkCard({ network, onClick }: NetworkCardProps) {
    const hasContainers = network.containers > 0;

    return (
        <div className="dkm-card dkm-network-card-tile" onClick={onClick}>
            <div className="dkm-card-header">
                <div className="dkm-card-title">
                    <div className="dkm-card-title-icon">
                        <Network size={16} />
                    </div>
                    <span>{network.name}</span>
                </div>

                <div className={`dkm-network-badge ${hasContainers ? "used" : "unused"}`}>
                    {hasContainers ? "● In Use" : "○ Unused"}
                </div>
            </div>

            <div className="dkm-card-body">
                <div className="dkm-info-row">
                    <span>Driver</span>
                    <span className="dkm-mono">{network.driver}</span>
                </div>

                <div className="dkm-info-row">
                    <span>Scope</span>
                    <span className="dkm-mono">{network.scope}</span>
                </div>

                <div className="dkm-info-row">
                    <span>Containers</span>
                    <span>{network.containers}</span>
                </div>
            </div>
        </div>
    );
}