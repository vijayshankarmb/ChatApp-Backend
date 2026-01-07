import { Server } from "http";
import app from "./app";

export const startServer = (PORT: number): Server => {
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    return server;
    
};