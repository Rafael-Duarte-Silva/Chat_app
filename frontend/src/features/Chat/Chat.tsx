"use client";

import { useEffect } from "react";

import { ws } from "@/services/ws";
import { useRouter } from "next/navigation";

import { ChatContentBar } from "./ChatContentBar";
import { ChatUserBar } from "./ChatUserBar";
import { ChatProvider } from "./context/chat/ChatProvider";

export const Chat = () => {
    const router = useRouter();

    useEffect(() => {
        ws.connect();

        ws.on("connect_error", (err) => {
            console.log(err.message);
            router.push("/login");
        });

        return () => {
            ws.disconnect();
        };
    }, []);

    return (
        <main className="flex h-dvh min-h-150 w-screen">
            <ChatProvider>
                <ChatUserBar />
                <ChatContentBar />
            </ChatProvider>
        </main>
    );
};

