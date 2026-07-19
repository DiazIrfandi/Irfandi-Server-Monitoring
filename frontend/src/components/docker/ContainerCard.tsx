import {
    Box,
    CheckCircle2,
    XCircle,
    RotateCw,
    Clock,
} from "lucide-react";

import type { DockerContainer } from "../../types/docker";
import ActionButton from "./actions/ActionButton";
import { useDocker } from "../../hooks/useDocker";

interface ContainerCardProps {
    container: DockerContainer;
    onSelect: (id: string) => void;
}

export default function ContainerCard({
    container,
    onSelect,
}: ContainerCardProps) {

    const docker = useDocker();
    
    const running = container.isRunning;

    return (

        <div className="dkm-card">

            <div className="dkm-card-top">

                <div className="dkm-card-icon-wrap">

                    <div className="dkm-card-icon">

                        <Box size={18} />

                    </div>

                    <span
                        className="dkm-status-dot"
                        style={{
                            background: running
                                ? "var(--good)"
                                : "var(--bad)",
                        }}
                    />

                </div>

                <div
                    style={{
                        minWidth: 0,
                    }}
                >

                    <div className="dkm-card-name">

                        {container.name}

                    </div>

                    <div className="dkm-card-image">

                        {container.image}

                    </div>

                    <div
                        className="dkm-status-pill"
                        style={{
                            color: running
                                ? "var(--good)"
                                : "var(--bad)",

                            background: running
                                ? "var(--good-soft)"
                                : "var(--bad-soft)",
                        }}
                    >

                        {running
                            ? <CheckCircle2 size={11}/>
                            : <XCircle size={11}/>
                        }

                        {container.state}

                    </div>

                </div>

            </div>

            <div
                style={{
                    marginTop: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    fontSize: 12,
                    color: "var(--text-dim)",
                }}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Tag</span>

                    <strong>{container.imageTag}</strong>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Created</span>

                    <strong>
                        {new Date(container.created * 1000)
                            .toLocaleDateString("id-ID")}
                    </strong>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Uptime</span>

                    <strong>
                        {container.uptime}
                    </strong>
                </div>

            </div>

            <div
                style={{
                    marginTop: 14,
                }}
            >

                <div
                    className="dkm-card-image"
                    style={{
                        marginBottom: 6,
                    }}
                >
                    Ports
                </div>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                    }}
                >

                    {container.ports.length === 0 ? (
                        container.isRunning ? (
                            <span className="dkm-port-chip">
                                No Port
                            </span>
                        ) : (
                            <span className="dkm-port-chip">
                                Container Stopped
                            </span>
                        )
                    ) : (
                        container.ports.map((port) => (
                            <span
                                key={`${port.privatePort}`}
                                className="dkm-port-chip"
                            >
                                {port.privatePort}
                            </span>
                        ))
                    )}

                </div>

            </div>

            <div
                style={{
                    marginTop: 14,
                }}
            >

                <div
                    className="dkm-card-image"
                    style={{
                        marginBottom: 6,
                    }}
                >
                    Network
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap",
                    }}
                >

                    {container.networks.map((network) => (

                        <>
                            <span
                                key={network.privatePort}
                                className="dkm-port-chip"
                            >
                                {network.privatePort}
                            </span>

                            <span
                                key={network.bindings.IPAddress}
                                className="dkm-port-chip"
                            >
                                {network.bindings.IPAddress}
                            </span>
                        </>

                    ))}

                </div>

            </div>

            <div className="dkm-actions">

                <ActionButton
                    label="Detail"
                    onClick={() => onSelect(container.id)}
                />

                {/* <ActionButton
                    label="Logs"
                /> */}

                {container.isRunning ? (

                    <>
                        <ActionButton
                            label={
                                docker.restart.isPending
                                    ? "Restarting..."
                                    : "Restart"
                            }
                            disabled={docker.restart.isPending}
                            onClick={() =>
                                docker.restart.mutate(container.id)
                            }
                        />

                        <ActionButton
                            label={
                                docker.stop.isPending
                                    ? "Stopping..."
                                    : "Stop"
                            }
                            disabled={docker.stop.isPending}
                            onClick={() =>
                                docker.stop.mutate(container.id)
                            }
                        />
                    </>

                ) : (

                    <ActionButton
                        label={
                            docker.start.isPending
                                ? "Starting..."
                                : "Start"
                        }
                        disabled={docker.start.isPending}
                        onClick={() =>
                            docker.start.mutate(container.id)
                        }
                    />

                )}

            </div>

        </div>

    );

}