import { ReactNode, useEffect, useMemo, useState } from "react";

import { Messages } from "@/interfaces/Messages";
import { ws } from "@/services/ws";

import { MessageContext } from "./useMessageContext";

export const MessageProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<Messages[]>([]);

    useEffect(() => {
        ws.on("loadMessage", (data: Messages[]) => {
            console.log(data);
            setMessages(data);
        });

        ws.on("message", (data: Messages) => {
            console.log(data);
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    }, []);

    const contextValue = useMemo(() => ({ messages }), [messages]);

    return (
        <MessageContext.Provider value={contextValue}>
            {children}
        </MessageContext.Provider>
    );
};

