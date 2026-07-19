import type { DockerNetwork, DockerNetworkDetail } from "../types/docker";
import { api } from "./axios";

export async function getContainer(id: string) {

    const response = await api.get(
        `/docker/${id}`
    );

    return response.data.data;

}

export async function getContainerLogs(
    id: string
) {

    const response = await api.get(
        `/docker/${id}/logs`
    );

    return response.data.data;

}

export async function getImages() {

    const response = await api.get(
        "/docker/images"
    );

    return response.data.data;

}

export async function deleteImage(
    id: string
) {

    const response = await api.delete(
        `/docker/images/${id}`
    );

    return response.data;

}

export async function pullImage(
    repository: string
){

    return api.post(

        "/docker/images/pull",

        {

            image:
                repository,

        }

    );

}

export async function getVolumes() {

    const response =
        await api.get("/docker/volumes");

    return response.data.data;

}

export async function getVolume(
    name: string
) {

    const response =
        await api.get(
            `/docker/volumes/${name}`
        );

    return response.data.data;

}

export async function deleteVolume(
    name: string
) {

    return await api.delete(
        `/docker/volumes/${name}`
    );

}

export async function getNetworks() {

    const response =
        await api.get("/docker/networks");

    return response.data.data as DockerNetwork[];

}

export async function getNetwork(id: string) {

    const response =
        await api.get(`/docker/networks/${id}`);

    return response.data.data as DockerNetworkDetail;

}

export async function deleteNetwork(id: string) {

    const response =
        await api.delete(`/docker/networks/${id}`);

    return response.data;

}