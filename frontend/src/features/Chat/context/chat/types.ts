import { CurrentChat } from "@/interfaces/CurrentChat";

export type ChatContextProps = {
    currentChat: CurrentChat | undefined;
    handleChat: (currentChat: CurrentChat) => void;
};

