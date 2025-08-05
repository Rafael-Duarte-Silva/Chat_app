import { ChatProfile } from "./ChatProfile";

type ChatMessageProps = {
    username: string;
    text: string;
    self?: boolean;
};

export const ChatMessage = ({
    username,
    text,
    self = false,
}: ChatMessageProps) => {
    return (
        <ChatProfile
            username={username}
            classNameContainer={`${self ? "flex-row-reverse" : "flex-row"}`}
            classNameInfos={` ${self ? "items-end" : "items-start"}`}
            classNameUsername={` ${self ? "text-right" : "text-left"}`}
        >
            <div
                className={`max-w-2/3 bg-gray-500 px-4 py-2 wrap-break-word ${self ? "rounded-s-2xl rounded-ee-2xl" : "rounded-e-2xl rounded-es-2xl"}`}
            >
                {text}
            </div>
        </ChatProfile>
    );
};

