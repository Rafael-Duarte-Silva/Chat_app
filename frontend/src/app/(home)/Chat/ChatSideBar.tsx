import { ChatProfile } from "./ChatProfile";
import { useChatContext } from "./context/useChatContext";

export const ChatSideBar = () => {
    const { users, handleChat } = useChatContext();

    return (
        <aside className="flex-[0_0_20%] border-r-2 border-r-neutral-700 bg-neutral-900 p-6 text-stone-50">
            <h1 className="text-3xl capitalize">chat app</h1>
            <label className="mt-8 block rounded-xl border-2 border-neutral-700 p-2.5">
                <input
                    type="text"
                    placeholder="search"
                    className="block w-full"
                />
            </label>
            <ul className="mt-10 flex flex-col gap-y-6">
                {users &&
                    users.map(({ id, username }) => (
                        <ChatProfile
                            key={id}
                            user={{ id, username }}
                            onClick={handleChat}
                        />
                    ))}
            </ul>
        </aside>
    );
};

