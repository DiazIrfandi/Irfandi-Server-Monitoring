export interface DockerImage {

    id: string;

    repository: string;

    tag: string;

    size: number;

    created: number;

    containers: number;

}