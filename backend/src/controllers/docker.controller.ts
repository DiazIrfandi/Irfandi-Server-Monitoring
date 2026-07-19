import { FastifyReply, FastifyRequest } from "fastify";
import { DockerService } from "../services/docker.service.js"; 
import { successResponse } from "../utils/api-response.js";

export class DockerController {

    static async getContainers(
        request: FastifyRequest,
        reply: FastifyReply,
    ) {

        const containers = await DockerService.getContainers();

        return reply.send(
            successResponse(
                "Containers retrieved successfully",
                containers
            )
        );

    }

    static async getContainer(
        request: FastifyRequest<{
            Params: {
                id: string;
            };
        }>,
        reply: FastifyReply
    ) {

        const { id } = request.params;

        const container =
            await DockerService.getContainer(id);

        return reply.send(
            successResponse(
                "Container retrieved successfully",
                container
            )
        );

    }

    static async startContainer(
        request: FastifyRequest<{
            Params: {
                id: string;
            };
        }>,
        reply: FastifyReply
    ) {

        const { id } = request.params;

        await DockerService.startContainer(id);

        return reply.send(
            successResponse(
                "Container started successfully",
                null
            )
        );

    }

    static async stopContainer(
        request: FastifyRequest<{
            Params: {
                id: string;
            };
        }>,
        reply: FastifyReply
    ) {

        const { id } = request.params;

        await DockerService.stopContainer(id);

        return reply.send(
            successResponse(
                "Container stopped successfully",
                null
            )
        );

    }

    static async restartContainer(
        request: FastifyRequest<{
            Params: {
                id: string;
            };
        }>,
        reply: FastifyReply
    ) {

        const { id } = request.params;

        await DockerService.restartContainer(id);

        return reply.send(
            successResponse(
                "Container restarted successfully",
                null
            )
        );

    }

    static async getStats(
        request: FastifyRequest,
        reply: FastifyReply
    ) {

        const stats =
            await DockerService.getStats();

        return reply.send(
            successResponse(
                "Docker statistics retrieved successfully",
                stats
            )
        );

    }

    static async getContainerLogs(
        request: FastifyRequest<{
            Params: {
                id: string;
            };
        }>,
        reply: FastifyReply
    ) {

        const { id } = request.params;

        const logs = await DockerService.getContainerLogs(id);

        return reply.send(
            successResponse(
                "Container logs retrieved successfully",
                {
                    logs
                }
            )
        );

    }

    static async getImages(
        request: FastifyRequest,
        reply: FastifyReply
    ) {

        const images =
            await DockerService.getImages();

        return reply.send(

            successResponse(

                "Images retrieved successfully",

                images

            )

        );

    }

    static async getImage(
        request: any,
        reply: any
    ) {

        const image =
            await DockerService.getImage(
                request.params.id
            );

        return reply.send(

            successResponse(

                "Image retrieved successfully",

                image

            )

        );

    }

    static async deleteImage(
        request: any,
        reply: any
    ) {

        await DockerService.deleteImage(
            request.params.id
        );

        return reply.send(

            successResponse(

                "Image deleted successfully",

                null

            )

        );

    }

    static async pullImage(
        request: any,
        reply: any
    ) {

        const { image } = request.body as {

            image: string;

        };

        await DockerService.pullImage(image);

        return reply.send(

            successResponse(

                "Image pulled successfully",

                null

            )

        );

    }

    static async getVolumes(
        request: any,
        reply: any
    ) {

        const volumes =
            await DockerService.getVolumes();

        return reply.send(

            successResponse(

                "Volumes retrieved successfully",

                volumes

            )

        );

    }

    static async getVolume(
        request:any,
        reply:any
    ) {

        const volume =
            await DockerService.getVolume(

                request.params.name

            );

        return reply.send(

            successResponse(

                "Volume retrieved successfully",

                volume

            )

        );

    }

    static async deleteVolume(
        request:any,
        reply:any
    ) {

        await DockerService.deleteVolume(

            request.params.name

        );

        return reply.send(

            successResponse(

                "Volume deleted successfully",

                null

            )

        );

    }

    static async getNetworks(
        request: FastifyRequest,
        reply: FastifyReply
    ) {

        const data =
            await DockerService.getNetworks();

        return reply.send({

            success: true,

            data,

        });

    }

    static async getNetwork(
        request: FastifyRequest<{
            Params: { id: string }
        }>,
        reply: FastifyReply
    ) {

        const data =
            await DockerService.getNetwork(
                request.params.id
            );

        return reply.send({

            success: true,

            data,

        });

    }

    static async deleteNetwork(
        request: FastifyRequest<{
            Params: { id: string }
        }>,
        reply: FastifyReply
    ) {

        await DockerService.deleteNetwork(
            request.params.id
        );

        return reply.send({

            success: true,

            message:
                "Network deleted.",

        });

    }

    static async getEvents(

        request:any,

        reply:any

    ) {

        return reply.send({

            success: true,

            data: DockerService.getEvents(),

        });

    }

}