import { RefObject } from "react";

import { CurrentChat } from "@/interfaces/CurrentChat";
import { Messages } from "@/interfaces/Messages";
import { UserData } from "@/interfaces/UserData";

export type ChatContextProps = {
    ref: RefObject<HTMLInputElement | null>;
    currentChat: CurrentChat | undefined;
    messages: Messages[];
    users: UserData[] | undefined;
    handleConnect: () => void;
    handleDisconnect: () => void;
    handleMessage: () => void;
    handleChat: (currentChat: CurrentChat) => void;
};

