import { ReactNode, useEffect, useRef, useState } from "react";

import { CurrentChat } from "@/interfaces/CurrentChat";
import { Messages } from "@/interfaces/Messages";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";

import { getUserData } from "./ChatUsersAPI";
import { ChatContext } from "./useChatContext";

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const chat = useChat();
    const { users } = useUserData("", "1");

    return (
        <ChatContext.Provider
            value={{
                ...chat,
                users,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

const useUserData = (search: string = "", page: string = "") => {
    const endpoint = `/users?search=${search}&page=${page}`;

    const query = useQuery({
        queryFn: ({ signal }) => getUserData(endpoint, signal),
        queryKey: ["users"],
        retry: 2,
    });

    return {
        ...query,
        users: query.data?.data,
    };
};

const socket = io("ws://localhost:3331/chat", {
    withCredentials: true,
    autoConnect: false,
});

const useChat = () => {
    const router = useRouter();

    const ref = useRef<HTMLInputElement | null>(null);
    const [currentChat, setCurrentChat] = useState<CurrentChat>();
    const [messages, setMessages] = useState<Messages[]>([]);

    useEffect(() => {
        socket.connect();
        socket.on("message", (data: Messages) => {
            console.log(data);
            setMessages((prevMessages) => [...prevMessages, data]);
        });
        socket.on("connect_error", (err) => {
            console.log(err.message);
            router.push("/login");
        });
    }, []);

    const handleChat = (currentChat: CurrentChat) => {
        setCurrentChat(currentChat);
    };

    const handleMessage = () => {
        socket.emit("message", {
            to: currentChat && currentChat.id,
            message: ref.current?.value,
        });
    };

    const handleConnect = () => {
        socket.connect();
    };

    const handleDisconnect = () => {
        socket.disconnect();
    };

    return {
        ref,
        currentChat,
        messages,
        handleConnect,
        handleDisconnect,
        handleMessage,
        handleChat,
    };
};

