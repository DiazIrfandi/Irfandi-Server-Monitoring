export type RestartPolicy =
    | "no"
    | "always"
    | "unless-stopped"
    | "on-failure";

export interface PortMapping {

    hostPort: number;

    containerPort: number;

    protocol: "tcp" | "udp";

}

export interface VolumeMapping {

    hostPath: string;

    containerPath: string;

    readOnly: boolean;

}

export interface VolumeMapping {

    hostPath: string;

    containerPath: string;

    readOnly: boolean;

}