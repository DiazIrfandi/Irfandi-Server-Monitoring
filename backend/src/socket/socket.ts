import { Server as HttpServer } from "node:http";
import { Server } from "socket.io";

let io: Server;

export function initializeSocket(server: HttpServer) {

    io = new Server(server, {

        cors: {
            origin: "*"
        }

    });

    io.on("connection", (socket) => {

        console.log("Client Connected:", socket.id);

        socket.on("disconnect", () => {

            console.log("Client Disconnected:", socket.id);

        });

        socket.onAny((event) => {

            console.log("Socket Event:", event);

        });

    });

}

export function getIO() {

    return io;

}