import { api } from "./axios";

export async function getDashboard() {
    const response = await api.get("/dashboard");
    return response.data.data;
}

export async function getApiStatus() {
    const response = await api.get("/");
    return response.data.data;
}