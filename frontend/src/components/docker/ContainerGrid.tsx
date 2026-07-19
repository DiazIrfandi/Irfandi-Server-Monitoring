import type { DockerContainer } from "../../types/docker";
import ContainerCard from "./ContainerCard";

interface ContainerGridProps {

    containers: DockerContainer[];

    onSelect: (id: string) => void;

}

export default function ContainerGrid({
    containers,
    onSelect,
}: ContainerGridProps) {

    if (containers.length === 0) {
        return (
            <div className="dkm-empty dkm-image-empty">
                No Containers in your Device.
            </div>
        );
    }

    return (
        <section className="dkm-container-grid">

            {containers.map((container) => (

                <ContainerCard
                    key={container.id}
                    container={container}
                    onSelect={onSelect}
                />

            ))}

        </section>
    );
}