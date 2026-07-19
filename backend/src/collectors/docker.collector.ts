import Docker from "dockerode";
import { getIO } from "../socket/socket.js";

const docker = new Docker();

export class DockerCollector {
    static async getContainers() {
        return await docker.listContainers({
            all: true
        })
    }

    static async getContainer(id:string){

        const container = docker.getContainer(id);

        return await container.inspect();

    }

    static async startContainer(id: string) {

        const container = docker.getContainer(id);

        await container.start();

    }

    static async stopContainer(id: string) {
        const container = docker.getContainer(id);

        await container.stop();
    }

    static async restartContainer(id: string) {
        const container = docker.getContainer(id);

        await container.restart();
    }

    static async getImages() {
        return await docker.listImages();
    }

    static async getVolumes() {
        return await docker.listVolumes();
    }
    
    static async getVolume(name: string) {

        const volume = docker.getVolume(name);

        return await volume.inspect();

    }

    static async deleteVolume(name: string) {

        const volume = docker.getVolume(name);

        await volume.remove();

    }

    static async getContainerLogs(id: string) {

        const container = docker.getContainer(id);

        return await container.logs({
            stdout: true,
            stderr: true,
            timestamps: true,
            tail: 100
        });

    }

    static async getImage(id: string) {

        const image = docker.getImage(id);

        return await image.inspect();

    }

    static async deleteImage(id: string) {

        const image = docker.getImage(id);

        return await image.remove();

    }

    static async pullImage(image: string) {

        return new Promise((resolve, reject) => {

            docker.pull(image, (error: any, stream: any) => {

                if (error) {

                    return reject(error);

                }

                docker.modem.followProgress(

                    stream,

                    (err) => {

                        if (err)
                            reject(err);

                        resolve(true);

                    },

                    (event) => {

                        getIO().emit(

                            "docker:image:pull",

                            event

                        );

                    }

                );

            });

        });

    }

    static async getNetworks() {
        return docker.listNetworks();
    }

    static async getNetwork(id: string) {
        return docker.getNetwork(id).inspect();
    }

    static async deleteNetwork(id: string) {
        return docker.getNetwork(id).remove();
    }

    static watchEvents(callback: (event: any) => void) {

        docker.getEvents((err, stream) => {

            if (err || !stream) {

                return;

            }

            stream.on("data", (buffer) => {

                try {

                    callback(

                        JSON.parse(buffer.toString())

                    );

                } catch {}

            });

        });

    }
}