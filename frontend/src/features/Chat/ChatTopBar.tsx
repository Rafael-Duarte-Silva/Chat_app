import { ChatProfile } from "./ChatProfile";
import { useChatContext } from "./context/chat/useChatContext";

export const ChatTopBar = () => {
    const { currentChat } = useChatContext();
    console.log(currentChat);

    return (
        <div className="border-b-2 border-b-neutral-700 bg-neutral-900 p-6 px-8 text-stone-50">
            {currentChat && <ChatProfile user={currentChat} />}
        </div>
    );
};

