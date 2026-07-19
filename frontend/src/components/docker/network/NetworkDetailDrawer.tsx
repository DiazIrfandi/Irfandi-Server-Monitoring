import { useState } from "react";

import { useNetwork, useDeleteNetwork } from "../../../hooks/useNetwork";

import ConfirmDialog from "../../common/ConfirmDialog";

interface Props {

    open: boolean;

    networkId: string | null;

    onClose: () => void;

}

export default function NetworkDetailDrawer({

    open,

    networkId,

    onClose,

}: Props) {

    const {

        data: network,

        isLoading,

    } = useNetwork(

        networkId,

        open && networkId !== null

    );

    const [confirmOpen, setConfirmOpen] = useState(false);

    const deleteNetwork = useDeleteNetwork();

    const builtinNetworks = [

        "bridge",

        "host",

        "none",

    ];

    const isBuiltin =

        builtinNetworks.includes(

            network?.name ?? ""

        );

    async function handleDelete() {

        if (!network) {

            return;

        }

        try {

            await deleteNetwork.mutateAsync(

                network.id

            );

            setConfirmOpen(false);

            onClose();

        } catch {}

    }

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

                onClick={(e)=>e.stopPropagation()}

            >

                <div className="dkm-drawer-header">

                    <h2>

                        Network Detail

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

                    ? <>Loading...</>

                    : (

                        <>

                            <div className="dkm-container-hero">

                                <div className="dkm-container-hero-icon">

                                    🌐

                                </div>

                                <h2>

                                    {network?.name}

                                </h2>

                                <div className="dkm-container-image">

                                    {network?.driver}

                                </div>

                                <div
                                    className={`dkm-volume-badge ${
                                        network?.containers.length
                                            ? "used"
                                            : "unused"
                                    }`}
                                >
                                    {

                                        network?.containers.length

                                            ? "In Use"

                                            : "Unused"

                                    }
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

                                            {network?.driver}

                                        </strong>

                                    </div>

                                    <div className="dkm-detail-row">

                                        <span>Scope</span>

                                        <strong>

                                            {network?.scope}

                                        </strong>

                                    </div>

                                    <div className="dkm-detail-row">

                                        <span>Containers</span>

                                        <strong>

                                            {network?.containers.length}

                                        </strong>

                                    </div>

                                </div>

                            </div>

                            <div className="dkm-detail-group">

                                <h4>

                                    Connected Containers

                                </h4>

                                {

                                    network?.containers.length

                                    ? (

                                        <div className="dkm-network-list">

                                            {

                                                network.containers.map((container:any)=>(

                                                    <div

                                                        key={container.id}

                                                        className="dkm-network-card"

                                                    >

                                                        🐳 {container.name}

                                                    </div>

                                                ))

                                            }

                                        </div>

                                    )

                                    : (

                                        <div className="dkm-empty">

                                            No container connected.

                                        </div>

                                    )

                                }

                            </div>

                            {

                                !isBuiltin && (

                                    <button

                                        className="dkm-image-delete"

                                        disabled={

                                            deleteNetwork.isPending ||

                                            network?.containers.length !== 0

                                        }

                                        onClick={()=>

                                            setConfirmOpen(true)

                                        }

                                    >

                                        {

                                            deleteNetwork.isPending

                                                ? "Deleting..."

                                                : "Delete Network"

                                        }

                                    </button>

                                )

                            }

                            <ConfirmDialog

                                open={confirmOpen}

                                title="Delete Network"

                                description={`Are you sure you want to delete "${network?.name}"?`}

                                confirmText="Delete"

                                loading={deleteNetwork.isPending}

                                onClose={()=>

                                    setConfirmOpen(false)

                                }

                                onConfirm={handleDelete}

                            />

                        </>

                    )

                }

            </aside>

        </div>

    );

}