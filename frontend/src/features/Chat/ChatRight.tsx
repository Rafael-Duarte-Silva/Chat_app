import { ChatContent } from "./ChatContent";
import { ChatMessageBar } from "./ChatMessageBar";
import { ChatTopBar } from "./ChatTopBar";
import { useChatContext } from "./context/chat/useChatContext";

export const ChatRight = () => {
    const { currentChat } = useChatContext();

    return (
        <div className="flex flex-auto flex-col bg-neutral-800">
            {currentChat && (
                <>
                    <ChatTopBar />
                    <ChatContent />
                    <ChatMessageBar />
                </>
            )}
        </div>
    );
};

