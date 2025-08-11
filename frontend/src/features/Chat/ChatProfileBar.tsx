import { memo } from "react";

import { ChatProfile } from "./ChatProfile";

type ChatProfileBarPros = { username?: string };

export const ChatProfileBar = memo(function ChatProfileBar({
    username,
}: ChatProfileBarPros) {
    return (
        <div className="flex h-38 items-center border-b-2 border-b-neutral-700 bg-neutral-900 px-8 text-stone-50">
            <ChatProfile username={username} />
        </div>
    );
});

