import type { DockerNetwork } from "../../../types/docker";
import NetworkCard from "./NetworkCard";

interface NetworkGridProps {
    networks: DockerNetwork[];
    onSelect(network: DockerNetwork): void;
}

export default function NetworkGrid({
    networks,
    onSelect,
}: NetworkGridProps) {

    if (networks.length === 0) {
        return (
            <div className="dkm-empty">
                No networks found.
            </div>
        );
    }

    return (
        <div className="dkm-grid">
            {networks.map((network) => (
                <NetworkCard
                    key={network.id}
                    network={network}
                    onClick={() => onSelect(network)}
                />
            ))}
        </div>
    );
}