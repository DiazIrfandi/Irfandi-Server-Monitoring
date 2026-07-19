import type { DockerImage } from "../../../types/image";
import ImageCard from "./ImageCard";

interface ImageGridProps {
    images: DockerImage[];
}

export default function ImageGrid({ images }: ImageGridProps) {
    if (images.length === 0) {
        return (
            <div className="dkm-empty dkm-image-empty">
                No images match your search or filter.
            </div>
        );
    }

    return (
        <div className="dkm-image-grid">
            {images.map((image) => (
                <ImageCard key={image.id} image={image} />
            ))}
        </div>
    );
}