"use client";

import { ChatBar } from "./ChatBar";
import { ChatContentBar } from "./ChatContentBar";
import { ChatProvider } from "./context/chat/ChatProvider";

export const Chat = () => {
    return (
        <main className="flex min-h-dvh w-screen">
            <ChatProvider>
                <ChatBar />
                <ChatContentBar />
            </ChatProvider>
        </main>
    );
};

