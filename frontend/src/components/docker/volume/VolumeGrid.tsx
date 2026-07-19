import type { DockerVolume } from "../../../types/volume";
import VolumeCard from "./VolumeCard";

interface VolumeGridProps {

    volumes: DockerVolume[];

    onSelect: (
        name: string
    ) => void;

}

export default function VolumeGrid({

    volumes,

    onSelect,

}: VolumeGridProps) {

    return (

        <div className="dkm-grid">

            {

                volumes.map(volume => (

                    <VolumeCard

                        key={volume.name}

                        volume={volume}

                        onClick={() =>
                            onSelect(
                                volume.name
                            )
                        }

                    />

                ))

            }

        </div>

    );

}