import { Socket } from "socket.io";
import { verifyAccessToken } from "../utils/jwt";

export const socketAuthMiddleware = (
    socket: Socket,
    next: (err?: Error) => void
) => {

    try {
        const cookieHeader = socket.handshake.headers.cookie;

        if (!cookieHeader) {
            return next(new Error("Authentication required"));
        }

        const cookies = Object.fromEntries(
            cookieHeader.split(": ").map((cookie) => {
                const [key, value] = cookie.split("=");
                return [key, value];
            })
        )

        const accessToken = cookies.accessToken;

        if (!accessToken) {
            return next(new Error("Access token is missing"));
        }

        const decoded = verifyAccessToken(accessToken);

        socket.data.user = decoded;

        next();
    } catch (error) {
        next(new Error("Invalid or expired token"));
    }

}