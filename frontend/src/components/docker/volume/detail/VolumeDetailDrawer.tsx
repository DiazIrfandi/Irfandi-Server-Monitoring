import { useVolume } from "../../../../hooks/useVolume";
import { useDeleteVolume } from "../../../../hooks/useDeleteVolume";
import ConfirmDialog from "../../../common/ConfirmDialog";
import { useState } from "react";

interface Props {

    open: boolean;

    volumeName: string | null;

    onClose: () => void;

}

export default function VolumeDetailDrawer({

    open,

    volumeName,

    onClose,

}: Props) {

    const {

        data: volume,

        isLoading,

    } = useVolume(

        volumeName,

        open && volumeName !== null

    );

    const [confirmOpen, setConfirmOpen] = useState(false);
    const deleteVolume = useDeleteVolume();

    const handleDelete = async () => {

        if (!volume) {

            return;

        }

        try {

            await deleteVolume.mutateAsync(volume.name);

            setConfirmOpen(false);

            onClose();

        } catch {

            // Toast sudah ditangani di hook.
        }

    };

    if (!open) {

        return null;

    }

    return (

        <div

            className={`dkm-drawer-overlay ${
                open ? "show" : ""
            }`}

            onClick={onClose}

        >

            <aside

                className="dkm-drawer"

                onClick={(e)=>

                    e.stopPropagation()

                }

            >

                <div className="dkm-drawer-header">

                    <h2>

                        Volume Detail

                    </h2>

                    <button

                        className="dkm-close-btn"

                        onClick={onClose}

                    >

                        ✕

                    </button>

                </div>

                {

                    isLoading

                    ? (

                        <>Loading...</>

                    )

                    : (
                        <>
                            <div className="dkm-container-hero">

                                <div className="dkm-container-hero-icon">

                                    💾

                                </div>

                                <h2>

                                    {volume?.name}

                                </h2>

                                <div className="dkm-container-image">

                                    {volume?.driver}

                                </div>

                                <div
                                    className={`dkm-volume-badge ${
                                        volume?.containers.length
                                            ? "used"
                                            : "unused"
                                    }`}
                                >
                                    {volume?.containers.length
                                        ? "In Use"
                                        : "Unused"}
                                </div>

                            </div>

                            <div className="dkm-detail-group">

                                <h4>

                                    Overview

                                </h4>

                                <div className="dkm-detail-card">

                                    <div className="dkm-detail-row">

                                        <span>Driver</span>

                                        <strong>

                                            {volume?.driver}

                                        </strong>

                                    </div>

                                    <div className="dkm-detail-row">

                                        <span>Scope</span>

                                        <strong>

                                            {volume?.scope}

                                        </strong>

                                    </div>

                                    <div className="dkm-detail-row">

                                        <span>Containers</span>

                                        <strong>

                                            {volume?.containers.length}

                                        </strong>

                                    </div>

                                </div>

                            </div>

                            <div className="dkm-detail-group">

                                <h4>

                                    Mount Point

                                </h4>

                                <div className="dkm-detail-card">

                                    <div
                                        style={{
                                            wordBreak: "break-all",
                                            fontSize: 12
                                        }}
                                    >
                                        {volume?.mountpoint}
                                    </div>

                                </div>

                            </div>

                            <div className="dkm-detail-group">

                                <h4>

                                    Attached Containers

                                </h4>

                                {
                                    volume?.containers.length

                                        ? (

                                            <div className="dkm-network-list">

                                                {

                                                    volume.containers.map((container:any) => (

                                                        <div
                                                            key={container.id}
                                                            className="dkm-network-card"
                                                        >

                                                            <div
                                                                className="dkm-network-card-top"
                                                            >

                                                                🐳

                                                                <strong>

                                                                    {container.name}

                                                                </strong>

                                                            </div>

                                                        </div>

                                                    ))

                                                }

                                            </div>

                                        )

                                        : (

                                            <div className="dkm-empty">

                                                No container attached.

                                            </div>

                                        )

                                }

                            </div>

                            <button

                                className="dkm-image-delete"

                                disabled={
                                    deleteVolume.isPending ||
                                    volume?.containers.length !== 0
                                }

                                title={deleteVolume.isPending || volume?.containers.length !== 0 ? "Volume in use" : "Delete"}

                                onClick={() => setConfirmOpen(true)}

                            >

                                {

                                    deleteVolume.isPending

                                        ? "Deleting..."

                                        : "Delete Volume"

                                }

                            </button>

                            <ConfirmDialog
                                open={confirmOpen}
                                title="Delete Volume"
                                description={`Are you sure you want to delete "${volume?.name}"?`}
                                confirmText="Delete"
                                loading={deleteVolume.isPending}
                                onClose={() => setConfirmOpen(false)}
                                onConfirm={handleDelete}
                            />
                        </>

                    )

                }

            </aside>

        </div>

    );

}