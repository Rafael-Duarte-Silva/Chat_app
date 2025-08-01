import { CurrentChat } from "@/interfaces/CurrentChat";

import { fullNameInitials } from "./utils/fullNameInitials";

type ChatProfileProps = {
    user: CurrentChat;
    onClick?(currentChat: CurrentChat): void;
};

export const ChatProfile = ({ user, onClick = () => {} }: ChatProfileProps) => {
    return (
        <li
            className="flex gap-x-4"
            onClick={() => onClick(user)}
        >
            <div className="flex size-10 items-center justify-center rounded-[50%] bg-amber-400 text-lg uppercase">
                {fullNameInitials(user?.username)}
            </div>
            <div>
                <span className="text-lg capitalize">{user?.username}</span>
            </div>
        </li>
    );
};

