import { useEffect, useRef } from "react";

import { ChatMessage } from "./ChatMessage";
import { useMessageContext } from "./context/message/useMessageContext";

export const ChatContent = () => {
    const { messages } = useMessageContext();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current === null) {
            return;
        }

        ref.current.scrollTop = ref.current.scrollHeight;
    }, [messages]);

    return (
        <div
            ref={ref}
            className="flex flex-auto flex-col gap-y-8 overflow-y-auto px-16 py-8"
        >
            {messages.map(({ from, to, message, username }, index) => (
                <ChatMessage
                    key={index}
                    username={username}
                    text={message}
                    self={from === to}
                />
            ))}
        </div>
    );
};

