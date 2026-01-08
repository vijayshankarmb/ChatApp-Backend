import { Server, Socket } from "socket.io";
import type { Server as HttpServer } from "http";
import { socketAuthMiddleware } from "./socket.auth";
import { addOnlineUser, removeOnlineUser } from "./onlineUsers";
let io: Server;

const handleSocketConnection = (socket: Socket) => {
    if (!socket.data.user) {
        console.error({
            event: "SOCKET_AUTH_FAILED",
            socketId: socket.id,
        });

        socket.disconnect(true);
        return;
    }

    const userId = socket.data.user._id;

    addOnlineUser(userId, socket.id);

    console.log({
        event: "SOCKET_CONNECTED",
        socketId: socket.id,
        userId,
    });

    socket.on("disconnect", (reason) => {

        removeOnlineUser(userId, socket.id);

        console.log({
            event: "SOCKET_DISCONNECTED",
            socketId: socket.id,
            userId,
            reason,
        });
    });
};

export const initSocket = (httpServer: HttpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: true,
            credentials: true,
        },
    });

    io.use(socketAuthMiddleware);
    io.on("connection", handleSocketConnection);

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized");
    }

    return io;
};
