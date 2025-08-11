import { useEffect, useState } from "react";

import { UserData } from "@/interfaces/UserData";
import { ws } from "@/services/ws";

import { ChatProfile } from "./ChatProfile";
import { useChatContext } from "./context/chat/useChatContext";

export const ChatUserBar = () => {
    const { handleChat } = useChatContext();

    const [users, setUsers] = useState<UserData[]>([]);

    useEffect(() => {
        ws.emit("getUsers", { page: 1, search: "" });
        ws.on("getUsers", (data: UserData[]) => {
            setUsers(data);
        });
    }, []);

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
                    users.map(({ id, name }) => (
                        <ChatProfile
                            key={id}
                            element="li"
                            username={name}
                            onClick={() => handleChat({ id, name })}
                        />
                    ))}
            </ul>
        </aside>
    );
};

/*const { pathPush } = useUserFilter();
    const searchParams = new URLSearchParams(useSearchParams().toString());
    const page = searchParams.get("page") || "1";
    const handlePage = (page: string) => {
        pathPush([["page", page]]);
    };

    const search = useRef<string>("");
    const deferredSearch: string = searchParams.get("search") || "";

    const handleSearchKeyboard = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        search.current = event.target.value;
    };

    const handleSearch = (event?: React.MouseEvent) => {
        if (event) {
            event.stopPropagation();
        }

        pathPush([
            ["search", search.current],
            ["page", "1"],
        ]);
    };*/

/*const useUserFilter = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const setFilters = useCallback(
        (queryList: string[][]) => {
            const params = new URLSearchParams(searchParams.toString());

            queryList.forEach(([name, value]) => {
                return value ? params.set(name, value) : params.delete(name);
            });

            return params.toString();
        },
        [searchParams],
    );

    const pathPush = (queryList: string[][]): void => {
        router.push(`${pathname}?${setFilters(queryList)}`);
    };

    return { pathPush };
};*/

