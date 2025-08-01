import { ChatMessage } from "./ChatMessage";
import { useChatContext } from "./context/useChatContext";

export const ChatContent = () => {
    const { messages } = useChatContext();

    return (
        <div className="flex flex-auto flex-col gap-y-8 px-16 py-8">
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

