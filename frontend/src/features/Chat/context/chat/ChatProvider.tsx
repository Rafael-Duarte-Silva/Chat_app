import { ReactNode, useMemo, useState } from "react";

import { CurrentChat } from "@/interfaces/CurrentChat";
import { ws } from "@/services/ws";

import { ChatContext } from "./useChatContext";

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [currentChat, setCurrentChat] = useState<CurrentChat>();

    const handleChat = (currentChatProp: CurrentChat) => {
        if (currentChatProp?.id === currentChat?.id) {
            return;
        }

        ws.emit("loadChat", { to: currentChatProp?.id });
        ws.once("loadChat", ({ chatId }: { chatId: string }) => {
            console.log(chatId);
            setCurrentChat({ ...currentChatProp, chatId });
            ws.emit("loadMessage", { chatId });
        });
    };

    const contextValue = useMemo(
        () => ({ currentChat, handleChat }),
        [currentChat?.id],
    );

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    );
};

