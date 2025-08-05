import { ReactNode, useEffect, useMemo, useState } from "react";

import { Messages } from "@/interfaces/Messages";
import { ws } from "@/services/ws";
import { useRouter } from "next/navigation";

import { MessageContext } from "./useMessageContext";

export const MessageProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [messages, setMessages] = useState<Messages[]>([]);

    useEffect(() => {
        ws.connect();
        ws.on("message", (data: Messages) => {
            console.log(data);
            setMessages((prevMessages) => [...prevMessages, data]);
        });
        ws.on("connect_error", (err) => {
            console.log(err.message);
            router.push("/login");
        });
    }, []);

    const contextValue = useMemo(() => ({ messages }), [messages]);

    return (
        <MessageContext.Provider value={contextValue}>
            {children}
        </MessageContext.Provider>
    );
};

