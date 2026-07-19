import { api } from "../api/axios";

export function startContainer(id: string) {
    return api.post(`/docker/${id}/start`);
}

export function stopContainer(id: string) {
    return api.post(`/docker/${id}/stop`);
}

export function restartContainer(id: string) {
    return api.post(`/docker/${id}/restart`);
}