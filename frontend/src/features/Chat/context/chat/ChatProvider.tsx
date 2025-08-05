import { ReactNode, useMemo, useState } from "react";

import { CurrentChat } from "@/interfaces/CurrentChat";

import { ChatContext } from "./useChatContext";

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [currentChat, setCurrentChat] = useState<CurrentChat>();

    const handleChat = (currentChatProp: CurrentChat) => {
        if (currentChatProp?.id === currentChat?.id) {
            return;
        }

        setCurrentChat(currentChatProp);
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

