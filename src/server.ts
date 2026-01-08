import http, { Server } from "http";
import app from "./app";
import { initSocket } from "./realtime";

export const startServer = (PORT: number): Server => {
    const server = http.createServer(app);
    
    initSocket(server);

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    return server;
    
};