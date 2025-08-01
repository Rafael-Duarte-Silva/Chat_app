"use client";

import { ChatContent, ChatMessageBar, ChatSideBar, ChatTopBar } from "./Chat";
import { ChatProvider } from "./Chat/context/ChatProvider";

export default function Home() {
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

    return (
        <main className="flex min-h-dvh w-screen">
            <ChatProvider>
                <ChatSideBar />
                <div className="flex flex-auto flex-col bg-neutral-800">
                    <ChatTopBar />
                    <ChatContent />
                    <ChatMessageBar />
                </div>
            </ChatProvider>
        </main>
    );
}

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
