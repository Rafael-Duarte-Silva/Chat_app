import { io } from "socket.io-client";

export const ws = io("ws://localhost:3331/chat", {
    withCredentials: true,
    autoConnect: false,
});
