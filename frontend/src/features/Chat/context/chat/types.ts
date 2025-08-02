import { RefObject } from "react";

import { CurrentChat } from "@/interfaces/CurrentChat";
import { Messages } from "@/interfaces/Messages";

export type ChatContextProps = {
    ref: RefObject<HTMLInputElement | null>;
    currentChat: CurrentChat | undefined;
    messages: Messages[];
    handleConnect: () => void;
    handleDisconnect: () => void;
    handleMessage: () => void;
    handleChat: (currentChat: CurrentChat) => void;
};

