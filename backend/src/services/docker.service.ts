import { DockerCollector } from "../collectors/docker.collector.js";

export class DockerService {

    private static events: any[] = [];

    static async getContainers() {

        const containers =
            await DockerCollector.getContainers();

        return containers.map((container) => ({

            id: container.Id,

            name: container.Names[0]?.replace("/", "") ?? "-",

            image: container.Image,

            imageTag:
                container.Image.split(":")[1] ?? "latest",

            state: container.State,

            status: container.Status,

            created: container.Created,
            
            uptime: container.Status,

            isRunning: container.State === "running",

            ports: container.Ports.map((port) => ({

                privatePort: port.PrivatePort,

                publicPort: port.PublicPort,

                type: port.Type,

                ip: port.IP,

            })),

            networks: Object.entries(
                container.NetworkSettings.Networks ?? {}
            ).map(([privatePort, bindings]) => ({
                privatePort,
                bindings,
            })),

            labels: container.Labels,
        }));

    }

    static async getContainer(id: string) {

        const container =
            await DockerCollector.getContainer(id);

        return {

            id: container.Id,

            name: container.Name.replace("/", ""),

            image: container.Config.Image,

            imageTag:
                container.Config.Image.split(":")[1] ?? "latest",

            status: container.State.Status,

            startedAt: container.State.StartedAt,

            running: container.State.Running,

            created: container.Created,

            restartCount: container.RestartCount,

            platform: container.Platform,

            mounts: container.Mounts,

            ports: Object.entries(
                container.NetworkSettings.Ports ?? {}
            ).map(([privatePort, bindings]) => ({

                privatePort,

                bindings,

            })),

            networks: Object.entries(
                container.NetworkSettings.Networks ?? {}
            ).map(([name, network]) => ({

                name,

                ip: network.IPAddress,

                gateway: network.Gateway,

                mac: network.MacAddress,

            })),

        };

    }

    static async startContainer(id: string) {

        await DockerCollector.startContainer(id);

    }

    static async stopContainer(id: string) {
        
        await DockerCollector.stopContainer(id);

    }

    static async restartContainer(id: string) {
        await DockerCollector.restartContainer(id);
    }

    static async getStats() {

        const [
            containers,
            images,
            volumes,
            networks
        ] = await Promise.all([
            DockerCollector.getContainers(),
            DockerCollector.getImages(),
            DockerCollector.getVolumes(),
            DockerCollector.getNetworks()
        ]);

        const running = containers.filter(
            container => container.State === "running"
        ).length;

        const paused = containers.filter(
            container => container.State === "paused"
        ).length;

        const stopped = containers.filter(
            container =>
                container.State === "exited" ||
                container.State === "dead" ||
                container.State === "created"
        ).length;

        return {

            containers: {

                total: containers.length,

                running,

                stopped,

                paused

            },

            images: images.length,

            volumes: volumes.Volumes?.length ?? 0,

            networks: networks.length

        };

    }

    static async getContainerLogs(id: string) {

        const buffer = await DockerCollector.getContainerLogs(id);

        const logs: string[] = [];

        let offset = 0;

        while (offset < buffer.length) {

            // Byte ke 4-7 = panjang payload (big-endian)
            const length = buffer.readUInt32BE(offset + 4);

            // Ambil isi log
            const message = buffer
                .subarray(offset + 8, offset + 8 + length)
                .toString("utf8")
                .trim();

            if (message.length > 0) {
                logs.push(message);
            }

            offset += 8 + length;
        }

        return logs;
    }

    static async getImages() {

        const images =
            await DockerCollector.getImages();

        return images.map(image => ({

            id: image.Id,

            repository:
                image.RepoTags?.[0]?.split(":")[0]
                ?? "<none>",

            tag:
                image.RepoTags?.[0]?.split(":")[1]
                ?? "<none>",

            size: image.Size,

            created: image.Created,

            containers: image.Containers,

        }));

    }

    static async getImage(id: string) {

        const image =
            await DockerCollector.getImage(id);

        return {

            id: image.Id,

            repository:
                image.RepoTags?.[0]?.split(":")[0]
                ?? "<none>",

            tag:
                image.RepoTags?.[0]?.split(":")[1]
                ?? "<none>",

            size: image.Size,

            created: image.Created,

            architecture: image.Architecture,

            os: image.Os,

            author: image.Author,

            dockerVersion: image.DockerVersion,

            labels: image.Config.Labels,

        };

    }

    static async deleteImage(id: string) {

        await DockerCollector.deleteImage(id);

    }

    static async pullImage(image: string) {

        await DockerCollector.pullImage(image);

    }

    static async getVolumes() {

        const volumes =
            await DockerCollector.getVolumes();

        const containers =
            await DockerCollector.getContainers();

        return (volumes.Volumes ?? []).map(volume => {

            const usedBy =
                containers.filter(container =>

                    container.Mounts?.some(

                        mount =>
                            mount.Name === volume.Name

                    )

                ).length;

            return {

                name: volume.Name,

                driver: volume.Driver,

                containers: usedBy,

            };

        });

    }

    static async getVolume(name: string) {

        const volume =
            await DockerCollector.getVolume(name);

        const containers =
            await DockerCollector.getContainers();

        const attachedContainers = containers

            .filter(container =>

                container.Mounts?.some(

                    mount =>
                        mount.Name === volume.Name

                )

            )

            .map(container => ({

                id: container.Id,

                name:
                    container.Names[0].replace("/", ""),

                image:
                    container.Image,

                state:
                    container.State,

            }));

        return {

            name: volume.Name,

            driver: volume.Driver,

            mountpoint: volume.Mountpoint,

            // created: volume.CreatedAt,

            scope: volume.Scope,

            labels: volume.Labels ?? {},

            containers: attachedContainers,

        };

    }

    static async deleteVolume(name: string) {

        await DockerCollector.deleteVolume(name);

    }

    static async getNetworks() {

        const networks =
            await DockerCollector.getNetworks();

        return networks.map(network => ({

            id: network.Id,

            name: network.Name,

            driver: network.Driver,

            scope: network.Scope,

            containers:
                Object.keys(
                    network.Containers ?? {}
                ).length,

        }));

    }

    static async getNetwork(id: string) {

        const network =
            await DockerCollector.getNetwork(id);

        return {

            id: network.Id,

            name: network.Name,

            driver: network.Driver,

            scope: network.Scope,

            subnet:
                network.IPAM?.Config?.[0]?.Subnet,

            gateway:
                network.IPAM?.Config?.[0]?.Gateway,

            containers:

                Object.values(
                    network.Containers ?? {}
                ).map((container: any) => ({

                    id: container.Name,

                    name: container.Name,

                    ipv4: container.IPv4Address,

                })),

        };

    }

    static async deleteNetwork(id: string) {

        await DockerCollector.deleteNetwork(id);

    }

    static getEvents() {

        return this.events
            .map((event) => ({
                type: event.Type,
                action: event.Action,
                name:
                    event.Actor?.Attributes?.name ??
                    event.Actor?.Attributes?.container ??
                    event.Actor?.ID,
                time: event.time,
                attributes: event.Actor?.Attributes ?? {},
            }))
            .sort((a, b) => b.time - a.time);

    }

    static pushEvent(event: any) {

        this.events.unshift(event);

        if (this.events.length > 100) {

            this.events.pop();

        }

    }

}