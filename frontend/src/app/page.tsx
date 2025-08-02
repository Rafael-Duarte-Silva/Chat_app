"use client";

import { ChatSideBar } from "@/features/Chat";
import { ChatRight } from "@/features/Chat/ChatRight";
import { ChatProvider } from "@/features/Chat/context/chat/ChatProvider";
import { ProfileProvider } from "@/features/Chat/context/profile/ProfileProvider";

export default function Home() {
    return (
        <main className="flex min-h-dvh w-screen">
            <ChatProvider>
                <ProfileProvider>
                    <ChatSideBar />
                    <ChatRight />
                </ProfileProvider>
            </ChatProvider>
        </main>
    );
}

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
