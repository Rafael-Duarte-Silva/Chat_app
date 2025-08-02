import { useChatContext } from "./context/chat/useChatContext";

export const ChatMessageBar = () => {
    const { ref, handleMessage } = useChatContext();

    return (
        <div className="flex h-28 items-center justify-between gap-x-12 border-t-2 border-t-neutral-700 bg-neutral-900 pr-8 pl-16 text-stone-50">
            <label className="h-1/2 w-3/4 rounded-xl border-2 border-neutral-700 p-2.5">
                <input
                    type="text"
                    placeholder="type message"
                    className="block size-full"
                    ref={ref}
                />
            </label>

            <button
                className="h-1/2 rounded-2xl bg-blue-400 px-8 capitalize"
                onClick={handleMessage}
            >
                send
            </button>
        </div>
    );
};

