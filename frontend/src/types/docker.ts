export interface DockerPort {
    privatePort?: number;
    publicPort?: number;
    type: string;
    ip?: string;
}

export interface DockerContainer {
    id: string;
    name: string;
    image: string;
    imageTag: string;

    state: string;
    status: string;
    uptime: string;
    created: number;

    isRunning: boolean;

    ports: DockerPort[];

    networks: DockerNetwork[];

    labels: Record<string, string>;
}

export interface DockerNetwork {

    id: string;

    name: string;

    driver: string;

    scope: string;

    containers: number;

}

export interface DockerNetworkDetail {

    id: string;

    name: string;

    driver: string;

    scope: string;

    subnet?: string;

    gateway?: string;

    containerCount: number;

    containers: {

        id: string;

        name: string;

        ipv4: string;

        mac: string;

    }[];

}