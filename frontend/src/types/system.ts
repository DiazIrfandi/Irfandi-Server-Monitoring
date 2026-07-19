export interface CpuInfo {
    manufacturer: string;
    brand: string;
    cores: number;
    physicalCores: number;
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

export interface NetworkInfo {
    iface: string;
    operstate: string;
    rx_sec: number;
    tx_sec: number;
}

export interface SystemInfo {
    cpu: CpuInfo;
    usageCpu: number;
    memory: MemoryInfo;
    disk: DiskInfo[];
    network: NetworkInfo[];
    system: {
        hostname: string;
        platform: string;
        distro: string;
        kernel: string;
        uptime: number;
    };
}