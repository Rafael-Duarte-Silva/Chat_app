import { memo } from "react";

import { ChatProfile } from "./ChatProfile";

type ChatProfileBarPros = { username: string };

export const ChatProfileBar = memo(function ChatProfileBar({
    username,
}: ChatProfileBarPros) {
    return (
        <div className="border-b-2 border-b-neutral-700 bg-neutral-900 p-6 px-8 text-stone-50">
            <ChatProfile username={username} />
        </div>
    );
});

