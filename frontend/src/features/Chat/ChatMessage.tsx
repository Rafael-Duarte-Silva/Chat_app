import { fullNameInitials } from "./utils/fullNameInitials";

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
        <div
            className={`flex gap-x-4 text-stone-50 ${self ? "flex-row-reverse" : "flex-row"}`}
        >
            <div className="flex size-10 flex-[0_0_auto] items-center justify-center rounded-[50%] bg-amber-400 text-lg uppercase">
                {fullNameInitials(username)}
            </div>
            <div
                className={`flex flex-auto flex-col ${self ? "items-end" : "items-start"}`}
            >
                <div
                    className={`capitalize ${self ? "text-right" : "text-left"}`}
                >
                    {username}
                </div>
                <div
                    className={`max-w-2/3 bg-gray-500 px-4 py-2 wrap-break-word ${self ? "rounded-s-2xl rounded-ee-2xl" : "rounded-e-2xl rounded-es-2xl"}`}
                >
                    {text}
                </div>
            </div>
        </div>
    );
};

