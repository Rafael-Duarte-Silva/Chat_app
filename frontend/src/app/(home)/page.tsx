"use client";

import { useEffect, useRef } from "react";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";

import { getUserData } from "./HomeAPI";

const socket = io("ws://localhost:3331/chat", { withCredentials: true });

export default function Home() {
    const { ref, handleConnect, handleDisconnect, handleMessage } = useChat();

    return (
        <div>
            <label htmlFor="message">message</label>
            <input
                id="message"
                type="text"
                ref={ref}
            />
            <button onClick={handleMessage}>send message</button>
            <button onClick={handleConnect}>connect</button>
            <button onClick={handleDisconnect}>disconnect</button>
        </div>
    );
}

const useUserData = (search: string = "", page: string = "") => {
    const endpoint = `/users?search=${search}&page=${page}`;

    const query = useQuery({
        queryFn: ({ signal }) => getUserData(endpoint, signal),
        queryKey: ["users"],
        retry: 2,
    });

    return {
        ...query,
        data: query.data?.data,
    };
};

const useChat = () => {
    const { data, isSuccess } = useUserData("", "1");
    const ref = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        socket.on(
            "message",
            ({ from, message }: { from: string; message: string }) => {
                console.log(from, message);
            },
        );
        socket.on("connect_error", (err) => {
            console.log(err.message);
            router.push("/login");
        });
    }, []);

    const handleMessage = isSuccess
        ? () => {
              socket.emit("message", {
                  to: isSuccess && data ? data[0].id : "",
                  message: ref.current?.value,
              });
          }
        : () => {};

    const handleConnect = () => {
        socket.connect();
    };

    const handleDisconnect = () => {
        socket.disconnect();
    };

    return { ref, handleConnect, handleDisconnect, handleMessage };
};
