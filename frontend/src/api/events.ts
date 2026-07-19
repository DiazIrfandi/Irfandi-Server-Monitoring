import { api } from "./axios";
import type { DockerEvent } from "../types/docker-event";

export async function getEvents() {

    const response = await api.get<{
        success: boolean;
        data: DockerEvent[];
    }>("/docker/events");

    return response.data.data;

}