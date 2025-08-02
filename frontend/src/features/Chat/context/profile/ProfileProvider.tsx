import { ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { getUserData } from "./ChatUsersAPI";
import { ProfileContext } from "./useProfileContext";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const { users } = useUserData("", "1");

    return (
        <ProfileContext.Provider value={{ users }}>
            {children}
        </ProfileContext.Provider>
    );
};

const useUserData = (search: string = "", page: string = "") => {
    const endpoint = `/users?search=${search}&page=${page}`;

    const query = useQuery({
        queryFn: ({ signal }) => getUserData(endpoint, signal),
        queryKey: ["users"],
        retry: 2,
    });

    return {
        ...query,
        users: query.data?.data,
    };
};

