
const onlineUsers = new Map<string, Set<string>>();

export const addOnlineUser = (userId: string, socketId: string) => {

    if (!onlineUsers.has(userId)) {

        onlineUsers.set(userId, new Set());
    }

    onlineUsers.get(userId)!.add(socketId);
};

export const removeOnlineUser = (userId: string, socketId: string) => {
    const userSockets = onlineUsers.get(userId);

    if (!userSockets) return;

    userSockets.delete(socketId);

    if (userSockets.size === 0) {
        onlineUsers.delete(userId);
    }
};

export const isUserOnline = (userId: string): boolean => {
    return onlineUsers.has(userId);
};

export const getOnlineUserSocketIds = (userId: string): string[] => {
    const sockets = onlineUsers.get(userId);

    if (!sockets) return [];

    return Array.from(sockets);
};
