import { createContext, useContext } from "react";

import { ProfileContextProps } from "./types";

export const ProfileContext = createContext<ProfileContextProps | undefined>(
    undefined,
);

export const useProfileContext = () => {
    const profileContext = useContext(ProfileContext);

    if (!profileContext) {
        throw new Error("Invalid Context");
    }

    return profileContext;
};

