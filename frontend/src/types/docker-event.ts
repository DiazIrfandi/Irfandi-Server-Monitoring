export interface DockerEvent {
    type: string;
    action: string;
    name: string;
    time: number;
    attributes: Record<string, any>;
}