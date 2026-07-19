import { useMemo, useState } from "react";

import { useNetworks } from "../../hooks/useNetwork";

import type { DockerNetwork } from "../../types/docker";

import NetworkGrid from "./network/NetworkGrid";
import { Search } from "lucide-react";
import NetworkDetailDrawer from "./network/NetworkDetailDrawer";

export default function Networks() {

    const [search, setSearch] = useState("");

    const {
        data: networks = [],
        isLoading,
        isError,
    } = useNetworks();

    const [selectedNetworkId, setSelectedNetworkId] = useState<string>();

    const filteredNetworks = useMemo(() => {

        return networks.filter((network) =>
            network.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    }, [networks, search]);

    if (isLoading) {
        return <div>Loading networks...</div>;
    }

    if (isError) {
        return <div>Failed to load networks.</div>;
    }

    return (
        <>

            <div className="dkm-page-toolbar">
                <div className="dkm-search">
                    <Search size={15} />
                    <input
                        type="text"
                        placeholder="Search network..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />

                </div>
            </div>

            <NetworkGrid
                networks={filteredNetworks}
                onSelect={(network) => {

                    setSelectedNetworkId(network.id);

                }}
            />

            <NetworkDetailDrawer

                open={!!selectedNetworkId}

                networkId={selectedNetworkId}

                onClose={() => setSelectedNetworkId(undefined)}

            />

        </>
    );
}