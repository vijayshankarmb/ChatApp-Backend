import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { socketAuthMiddleware } from "./socket.auth";

let io: Server;

export const initSocket = (httpServer: HttpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: true, 
            credentials: true
        }
    })

    io.use(socketAuthMiddleware);
    
    return io
}

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }

    return io
}
