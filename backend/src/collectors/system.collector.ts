import si from "systeminformation";

export class SystemCollector {
    static async getSystem() {

        const [
            load,
            cpu,
            memory,
            filesystem,
            time,
            os,
            network,
        ] = await Promise.all([
            si.currentLoad(),
            si.cpu(),
            si.mem(),
            si.fsSize(),
            si.time(),
            si.osInfo(),
            si.networkStats(),
        ]);

        return {
            cpu: cpu,
            
            usageCpu: Number(load.currentLoad.toFixed(2)),

            memory: {
                total: memory.total,
                used: memory.used,
                free: memory.free,
                usage: Number(
                    ((memory.used / memory.total) * 100).toFixed(2)
                )
            },

            network: network,

            disk: filesystem.map((disk) => ({
                filesystem: disk.fs,
                mount: disk.mount,
                size: disk.size,
                used: disk.used,
                usage: disk.use
            })),

            system: {
                hostname: os.hostname,
                platform: os.platform,
                distro: os.distro,
                kernel: os.kernel,
                uptime: time.uptime
            }
        }
    }
}