import { useMemo, useState } from "react";
import { useVolumes } from "../hooks/useVolumes";
import VolumeGrid from "../components/docker/volume/VolumeGrid";
import { Search } from "lucide-react";
import VolumeDetailDrawer from "../components/docker/volume/detail/VolumeDetailDrawer";

export default function Volumes() {

    const {

        data,

        isLoading,

    } = useVolumes();

    const [search, setSearch] = useState("");

    const filteredVolumes = useMemo(() => {

        if (!data) {

            return [];

        }

        return data.filter((volume:any) =>

            volume.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                ) ||

            volume.driver
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        );

    }, [data, search]);

    const [selectedVolume, setSelectedVolume] =
        useState<string | null>(null);

    const [drawerOpen, setDrawerOpen] =
        useState(false);

    if (isLoading) {

        return <>Loading...</>;

    }

    if (!isLoading && filteredVolumes.length === 0) {

        return (

            <>
                <div className="dkm-page-toolbar">
                    <div className="dkm-search">
                        <Search size={15} />
                        <input
                            placeholder="Search volume..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </div>
                
                <div className="dkm-empty dkm-image-empty">

                    No volume found.

                </div>
            </>

        );

    }

    return (

        <>
            <div className="dkm-page-toolbar">
                <div className="dkm-search">
                    <Search size={15} />
                    <input
                        placeholder="Search volume..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />
                </div>
            </div>

            <VolumeGrid

                volumes={filteredVolumes}

                onSelect={(name) => {

                    setSelectedVolume(name);

                    setDrawerOpen(true);

                }}

            />

            <VolumeDetailDrawer

                open={drawerOpen}

                volumeName={selectedVolume}

                onClose={() =>
                    setDrawerOpen(false)
                }

            />
        </>

    );

}