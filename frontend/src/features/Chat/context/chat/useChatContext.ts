import { createContext, useContext } from "react";

import { ChatContextProps } from "./types";

export const ChatContext = createContext<ChatContextProps | undefined>(
    undefined,
);

export const useChatContext = () => {
    const chatContext = useContext(ChatContext);

    if (!chatContext) {
        throw new Error("Invalid Context");
    }

    return chatContext;
};

