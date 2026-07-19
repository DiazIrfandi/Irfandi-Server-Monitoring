export function formatBytes(bytes: number): string {
    if (!bytes) return "0 B";

    const units = ["B", "KB", "MB", "GB", "TB"];

    let value = bytes;
    let unit = 0;

    while (value >= 1024 && unit < units.length - 1) {
        value /= 1024;
        unit++;
    }

    return `${value.toFixed(2)} ${units[unit]}`;
}

export function formatSpeed(bytes: number): string {
    if (!bytes) return "0 B/s";

    const units = ["B/s", "KB/s", "MB/s", "GB/s"];

    let value = bytes;
    let unit = 0;

    while (value >= 1024 && unit < units.length - 1) {
        value /= 1024;
        unit++;
    }

    return `${value.toFixed(1)} ${units[unit]}`;
}

export function formatPercent(value: number): string {
    return `${value.toFixed(1)}%`;
}

export function formatUptime(seconds: number): string {

    if (!seconds) return "-";

    const day = Math.floor(seconds / 86400);
    const hour = Math.floor((seconds % 86400) / 3600);
    const minute = Math.floor((seconds % 3600) / 60);

    const parts: string[] = [];

    if (day > 0) parts.push(`${day} Hari`);
    if (hour > 0) parts.push(`${hour} Jam`);
    if (minute > 0 || parts.length === 0) parts.push(`${minute} Menit`);

    return parts.join(" ");
}

export function formatNetworkSpeed(bytes: number): string {
    if (!bytes) return "0 B/s";

    const units = ["B/s", "KB/s", "MB/s", "GB/s"];

    let value = bytes;
    let index = 0;

    while (value >= 1024 && index < units.length - 1) {
        value /= 1024;
        index++;
    }

    return `${value.toFixed(2)} ${units[index]}`;
}