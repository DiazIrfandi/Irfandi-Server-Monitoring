export interface DockerVolume {

    name: string;

    driver: string;

    containers: number;

}

export interface DockerVolumeDetail {

    name: string;

    driver: string;

    mountpoint: string;

    scope: string;

    labels: Record<string, string>;

    containers: {

        id: string;

        name: string;

        image: string;

        state: string;

    }[];

}