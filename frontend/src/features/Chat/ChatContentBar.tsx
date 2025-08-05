import { ChatContent } from "./ChatContent";
import { ChatMessageBar } from "./ChatMessageBar";
import { ChatProfileBar } from "./ChatProfileBar";
import { useChatContext } from "./context/chat/useChatContext";
import { MessageProvider } from "./context/message/MessageProvider";

export const ChatContentBar = () => {
    const { currentChat } = useChatContext();

    return (
        <div className="flex flex-auto flex-col bg-neutral-800">
            {currentChat && <ChatProfileBar username={currentChat.username} />}
            <MessageProvider>{currentChat && <ChatContent />}</MessageProvider>
            {currentChat && <ChatMessageBar id={currentChat.id} />}
        </div>
    );
};

