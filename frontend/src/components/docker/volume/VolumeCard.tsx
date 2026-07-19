import { Database, ArrowRight } from "lucide-react";
import type { DockerVolume } from "../../../types/volume";

interface VolumeCardProps {
    volume: DockerVolume;
    onClick: () => void;
}

export default function VolumeCard({ volume, onClick }: VolumeCardProps) {
    const inUse = volume.containers > 0;

    return (
        <div className="dkm-volume-card" onClick={onClick}>
            <div className="dkm-volume-top">
                <div className="dkm-volume-icon">
                    <Database size={20} />
                </div>

                <div className="dkm-volume-heading">
                    <h3>{volume.name}</h3>
                    <span className="dkm-mono">Driver • {volume.driver}</span>
                </div>
            </div>

            <div className="dkm-volume-divider" />

            <div className="dkm-volume-status">
                <div className={`dkm-volume-badge ${inUse ? "used" : "unused"}`}>
                    {inUse ? "● In Use" : "○ Unused"}
                </div>

                <strong>
                    {volume.containers} {volume.containers === 1 ? "Container" : "Containers"}
                </strong>
            </div>

            <div className="dkm-volume-divider" />

            <div className="dkm-volume-footer">
                <span>Volume</span>
                <ArrowRight size={16} className="dkm-volume-arrow" />
            </div>
        </div>
    );
}