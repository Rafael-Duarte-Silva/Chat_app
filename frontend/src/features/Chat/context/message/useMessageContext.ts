import { createContext, useContext } from "react";

import { MessageContextProps } from "./types";

export const MessageContext = createContext<MessageContextProps | undefined>(
    undefined,
);

export const useMessageContext = () => {
    const messageContext = useContext(MessageContext);

    if (!messageContext) {
        throw new Error("Invalid Context");
    }

    return messageContext;
};

