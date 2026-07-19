export interface CpuInfo {
    usage: number;
}

export interface MemoryInfo {
    total: number;
    used: number;
    free: number;
    usage: number;
}

export interface DiskInfo {
    filesystem: string;
    mount: string;
    size: number;
    used: number;
    usage: number;
}

export interface SystemInfo {

    cpu: CpuInfo;

    memory: MemoryInfo;

    disk: DiskInfo[];

}