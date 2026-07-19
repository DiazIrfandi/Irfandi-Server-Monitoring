import { useState } from "react";
import { Box, Trash2 } from "lucide-react";
import type { DockerImage } from "../../../types/image";
import { formatBytes } from "../../../utils/format";
import { useDeleteImage } from "../../../hooks/useDeleteImage";
import ConfirmDialog from "../../common/ConfirmDialog";

interface ImageCardProps {
    image: DockerImage;
}

export default function ImageCard({ image }: ImageCardProps) {
    const dangling = image.repository === "<none>";
    const used = image.containers > 0;

    const deleteMutation = useDeleteImage();
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <>
            <div className="dkm-image-card">
                <div className="dkm-image-icon">
                    <Box size={24} />
                </div>

                <div className="dkm-image-content">
                    <h3 className="dkm-image-repo">{image.repository}</h3>
                    <span className="dkm-image-tag dkm-mono">{image.tag}</span>

                    <div className="dkm-image-meta">
                        <span className="dkm-mono">{formatBytes(image.size)}</span>
                        <span>
                            {image.containers}{" "}
                            {image.containers === 1 ? "container" : "containers"}
                        </span>
                    </div>

                    <button
                        className="dkm-image-delete"
                        disabled={deleteMutation.isPending}
                        onClick={() => setOpenDelete(true)}
                    >
                        <Trash2 size={15} />
                        Delete
                    </button>
                </div>
            </div>

            <ConfirmDialog
                open={openDelete}
                title="Delete Image"
                description={`Delete ${image.repository}:${image.tag}? This can't be undone.`}
                confirmText="Delete"
                onClose={() => setOpenDelete(false)}
                onConfirm={() => {
                    deleteMutation.mutate(image.id);
                    setOpenDelete(false);
                }}
            />
        </>
    );
}