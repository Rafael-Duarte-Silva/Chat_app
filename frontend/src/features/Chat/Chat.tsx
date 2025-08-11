"use client";

import { useEffect } from "react";

import { ws } from "@/services/ws";

import { ChatContentBar } from "./ChatContentBar";
import { ChatUserBar } from "./ChatUserBar";
import { ChatProvider } from "./context/chat/ChatProvider";

export const Chat = () => {
    useEffect(() => {
        ws.connect();
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

